import React from 'react';
import { View, ScrollView } from 'react-native';
import { ImageCarousel } from '../ProductScreen/components/ImageCarousel';
import { mockProductData } from '../../mocks/productMock'; // <-- Importando o Mock
import { ProductHeaderInfo } from './components/ProductHeaderInfo';
import { RentalOptionsForm } from './components/RentalOptionsForm';

export function ProductScreen() {
  // Simulando o dado chegando
  const product = mockProductData;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
       {/* Repassando o mock para o componente isolado */}
       <ImageCarousel images={product.productImages} />
       
       <ProductHeaderInfo 
          title={product.productTitle}
          rating={product.overallAverageRating}
          reviewsCount={product.totalCustomerReviewsCount}
          price={product.dailyRentalPrice}
        />

        <RentalOptionsForm availableVoltages={product.availableVoltageOptions} />
        
    </ScrollView>
  );
}