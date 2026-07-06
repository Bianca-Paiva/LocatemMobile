import React from 'react';
import { View, ScrollView } from 'react-native';


//===================== Importando o Mock ====================
import { mockProductData } from '../../mocks/productMock';

//===================== Importando os Componentes ====================
import { ImageCarousel } from '../ProductScreen/components/ImageCarousel';
import { ProductHeaderInfo } from './components/ProductHeaderInfo';
import { RentalOptionsForm } from './components/RentalOptionsForm';
import { ActionButtons } from './components/ActionButtons';

export function ProductScreen() {
  const product = mockProductData;

  const handleRent = () => {
    console.log('Botão de Locar pressionado');
  }
  const handleAddToCart = () => {
    console.log('Botão de Adicionar ao Carrinho pressionado');
  }

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

        <ActionButtons
        onRent={handleRent} 
        onAddToCart={handleAddToCart}
        />
        
    </ScrollView>
  );
}