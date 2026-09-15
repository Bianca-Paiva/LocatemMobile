import React from 'react';

import { View, Text, Pressable } from 'react-native';

import { ChevronLeft, ChevronRight } from 'lucide-react-native';

import { styles } from './styles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onPrev,
  onNext,
}: PaginationProps) {
  // Com 1 página ou menos não há o que paginar
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <View style={styles.pagination}>
      <Pressable
        style={[styles.arrowButton, currentPage === 1 && styles.arrowButtonDisabled]}
        onPress={onPrev}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={16} color={currentPage === 1 ? '#C4C4C4' : '#1A1A1A'} />
      </Pressable>

      {pages.map((page) => {
        const active = page === currentPage;
        return (
          <Pressable
            key={page}
            style={[styles.pageButton, active && styles.pageButtonActive]}
            onPress={() => onPageChange(page)}
          >
            <Text style={[styles.pageButtonText, active && styles.pageButtonTextActive]}>
              {page}
            </Text>
          </Pressable>
        );
      })}

      <Pressable
        style={[styles.arrowButton, currentPage === totalPages && styles.arrowButtonDisabled]}
        onPress={onNext}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={16} color={currentPage === totalPages ? '#C4C4C4' : '#1A1A1A'} />
      </Pressable>
    </View>
  );
}
