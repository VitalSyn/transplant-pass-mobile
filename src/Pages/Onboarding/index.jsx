import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const CarouselWithSteps = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navega para a próxima tela ou outro componente
      navigation.navigate('Initial'); // 
    }
  };

  const renderScreen = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={{ justifyContent: 'center', alignItems: 'center', height: 300 }}>
            <Image
              source={require('../../../assets/images/Onboarding1.png')} // Substitua pelo caminho da sua imagem
              style={{ width: 200, height: 200 }}
            />
            <Text style={{ color: '#126B43', fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginTop: 20 }}>
              Acompanhe seu processo
            </Text>
            <Text style={{ color: '#666', fontSize: 16, textAlign: 'center', marginTop: 10 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula
               Vivamus laoreet justo
              .
            </Text>
          </View>
        );
      case 1:
        return (
          <View style={{ justifyContent: 'center', alignItems: 'center', height: 300 }}>
            <Image
              source={require('../../../assets/images/Onboarding2.png')} // Substitua pelo caminho da sua imagem
              style={{ width: 200, height: 200 }}
            />
            <Text style={{ color: '#126B43', fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginTop: 20 }}>
              Mantenha seu cadastro atualizado
            </Text>
            <Text style={{ color: '#666', fontSize: 16, textAlign: 'center', marginTop: 10 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula
            Vivamus laoreet justo
            </Text>
          </View>
        );
      case 2:
        return (
          <View style={{ justifyContent: 'center', alignItems: 'center', height: 300 }}>
            <Image
              source={require('../../../assets/images/Onboarding3.png')} // Substitua pelo caminho da sua imagem
              style={{ width: 200, height: 200 }}
            />
            <Text style={{ color: '#126B43', fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginTop: 20 }}>
              Marque seu exame
            </Text>
            <Text style={{ color: '#666', fontSize: 16, textAlign: 'center', marginTop: 10 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula
            Vivamus laoreet justo
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  const renderIndicators = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
        {[0, 1, 2].map((step) => (
          <View
            key={step}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: currentStep === step ? '#126B43' : '#ccc',
              marginHorizontal: 5,
            }}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      {renderScreen()}
      {renderIndicators()}
      <TouchableOpacity
        onPress={handleNextStep}
        style={{
          backgroundColor: '#ff0000', // Botão vermelho
          width: 180, // Largura do botão
          height: 50, // Altura do botão
          borderRadius: 30, // Raio dos cantos arredondados
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
          {currentStep === 2 ? 'Concluir' : 'Próximo'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CarouselWithSteps;
