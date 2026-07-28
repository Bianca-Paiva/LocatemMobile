import React from 'react';
import { Text, View, ScrollView } from 'react-native';


//===================== Importando o Mock ====================
import { mockProductData } from '../../mocks/productMock';

//===================== Importando os Componentes ====================
import { ImageCarousel } from '../ProductScreen/components/ImageCarousel';
import { ProductHeaderInfo } from './components/ProductHeaderInfo';
import { RentalOptionsForm } from './components/RentalOptionsForm';
import { ActionButtons } from './components/ActionButtons';
import { StoreBadgeCard } from './components/StoreBadgeCard';
import { Accordion } from './components/Accordion';
import { ReviewsSummary } from './components/ReviewsSummary';
import { CustomerFeedbackCard } from './components/CustomerFeedback';

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
       {/* Carousel de Imagens */}
       <ImageCarousel images={product.productImages}/>

        {/* Informações do Produto Ex:(Valores e etc.) */}
       <ProductHeaderInfo 
          title={product.productTitle}
          rating={product.overallAverageRating}
          reviewsCount={product.totalCustomerReviewsCount}
          price={product.dailyRentalPrice}
        />

        {/* Formulário de Opções de Locação Ex:(Voltagens Disponíveis, Tempos de Locação e quantidade) */}
        <RentalOptionsForm availableVoltages={product.availableVoltageOptions} />

        {/* Botões de Ação Ex:(Locar, Adicionar ao Carrinho) */}
        <ActionButtons
        onRent={handleRent} 
        onAddToCart={handleAddToCart}
        />

        {/* Card da loja*/}
        <StoreBadgeCard
          storeName={product.storeInfo.storeName}
          isVerifiedStore={product.storeInfo.isVerifiedStore}
          averageRating={product.storeInfo.averageReputation}
          storeBadgeImage={product.storeInfo.storeBadgeImage}
          />

        {/* Acordeões de Descrição e Especificações Técnicas */}
        <Accordion title="Descrição">
          <Text style={{ fontSize: 14, color: '#444', lineHeight: 22 }}>
            {product.fullDescription}
          </Text>
        </Accordion>

        <Accordion title="Especificações Técnicas">
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#EAEAEA' }}>
              <Text style={{ fontSize: 14, color: '#888' }}>Potência de saída</Text>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#333' }}>{product.technicalSpecs.powerSource}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#EAEAEA' }}>
              <Text style={{ fontSize: 14, color: '#888' }}>Torque máximo</Text>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#333' }}>{product.technicalSpecs.maxTorque}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#EAEAEA' }}>
              <Text style={{ fontSize: 14, color: '#888' }}>Tamanho do mandril</Text>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#333' }}>{product.technicalSpecs.chuckSize}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 }}>
              <Text style={{ fontSize: 14, color: '#888' }}>Acessórios Inclusos</Text>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#333' }}>{product.technicalSpecs.includedAccessories}</Text>
            </View>
          </View>
        </Accordion>

        {/* Título da Seção */}
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#1A1A1A', marginHorizontal: 20, marginTop: 24, marginBottom: 16 }}>
          Avaliações
        </Text>

        <ReviewsSummary 
          averageRating={product.overallAverageRating}
          totalReviews={product.totalCustomerReviewsCount}
        />

        {product.custumerFeedback.map((review) => (
          <CustomerFeedbackCard 
            key={review.id}
            reviewerName={review.reviewerName}
            starRating={review.starRating}
            feedbackMessage={review.feedbackMessage}
            hasAttachedPhotos={review.hasAttachedPhotos}
          />
        ))}
        
    </ScrollView>
  );
}