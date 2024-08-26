import React, { useState } from "react";
import { Text, SafeAreaView, View, TouchableOpacity, Dimensions, Image } from "react-native";
import { useNavigationHandler } from "@/src/Hooks/navigation";
import styles from "./styles";
import images from '@/src/Constants/images';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';


export default function Onboarding() {
  const navigate = useNavigationHandler();
  const { width: screenWidth } = Dimensions.get('window');
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = React.useRef(null);
  const data = [
    {
      title: 'Bem-vindo ao App!',
      description: 'Acompanhe seu Processo.',
      image: images.Onboarding1,
    },
    {
      title: 'Mantenha seu Cadastro Atualizado',
      description: 'Explore nossas funcionalidades incríveis e aproveite ao máximo.',
      image: images.Onboarding2,
    },
    {
      title: 'Vamos Começar!',
      description: 'Entre ou registre-se agora e comece a usar o app.',
      image: images.Onboarding3,
    },
  ];
  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        data={data}
        ref={carouselRef}
        renderItem={renderItem}
        width={screenWidth}
        height={screenWidth * 1.2}
        mode="parallax"
        loop={false}
        autoPlay={false}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setCurrentIndex(index)}
      />
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              { opacity: index === currentIndex ? 1 : 0.3 },
            ]}
            onPress={() => {
              carouselRef.current?.scrollTo({ index, animated: true });
              setCurrentIndex(index);
            }}
          />
        ))}
      </View>
      <View style={{ width: '100%', position: 'absolute', bottom: 150 }}>
        {currentIndex >= 2 ? (
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => { navigate.navigate('Login') }}
          >
            <Text style={styles.textSubmit}>Tudo certo</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              carouselRef.current?.scrollTo({ index: currentIndex + 1, animated: true });
              setCurrentIndex(currentIndex + 1);
            }}
          >
            <Text style={styles.textSubmit}>Próximo</Text>
          </TouchableOpacity>
        )}
      </View>

    </SafeAreaView>
  );
};