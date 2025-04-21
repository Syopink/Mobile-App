import React from 'react';
import { ScrollView, Text, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import iPhone from '../../assets/images/Xiaomi-Redmi-Note-6-Pro–32GB-Blue.png';
import ScreenLayout from '../components/Layout/ScreenLayout';  // Import ScreenLayout
import IphoneXs from '../../assets/images/iPhone-Xs-256GB-Gold.png';
import IphoneXr from '../../assets/images/iPhone-Xr-2-Sim-256GB-Red.png';
import Samsung from '../../assets/images/Samsung-Galaxy-S9-Plus-64GB-Orchid-Gray.png';
import OppoF9  from '../../assets/images/OPPO-F9-Sunrise-Red.png';
import OppoR17 from '../../assets/images/OPPO-R17-Pro-Lavender.png';
import OppoA7 from '../../assets/images/OPPO-A7-64GB-Blue.png';
const Home = ({ navigation }) => {
  return (
    <ScreenLayout navigation={navigation}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}> 
          Welcome back,{"\n"}
          <Text style={styles.username}>Nguyen Gia Huy</Text>
        </Text>

        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="What phone are you looking for?" />
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerText}>Flash Sale{"\n"}Up to 30% Off</Text>
        </View>

        {/* Featured Phones 1 */}
        <Text style={styles.sectionTitle}>Shop The Look</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productRowHorizontal}>
          <ProductCard
            name="iPhone 15 Pro Max"
            price="$1,099.00"
            image={iPhone}
            onPress={() => navigation.navigate('ProductDetail', {
              productName: "iPhone 15 Pro Max",
              productPrice: "$1,099.00",
              productImage: iPhone,
              productBrand: "Apple",
            })}
          />
          <ProductCard
            name="Galaxy S24 Ultra"
            price="$1,199.00"
            image={Samsung}
            onPress={() => navigation.navigate('ProductDetail', {
              productName: "Galaxy S24 Ultra",
              productPrice: "$1,199.00",
              productImage: Samsung,
              productBrand: "Samsung",
            })}
          />
          <ProductCard
            name="Galaxy S24 Ultra"
            price="$1,199.00"
            image={IphoneXr}
            onPress={() => navigation.navigate('ProductDetail', {
              productName: "Galaxy S24 Ultra",
              productPrice: "$1,199.00",
              productImage: IphoneXr,
              productBrand: "Apple",
            })}
          />
        </ScrollView>

        {/* Featured Phones 2 */}
        <Text style={styles.sectionTitle}>Iphone</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productRowHorizontal}>
        <ProductCard
            name="iPhone 15 Pro Max"
            price="$1,099.00"
            image={iPhone}
            onPress={() => navigation.navigate('ProductDetail', {
              productName: "iPhone 15 Pro Max",
              productPrice: "$1,099.00",
              productImage: iPhone,
              productBrand: "Apple",
            })}
          />
          <ProductCard
            name="Iphone Xs 256GB Gold"
            price="$1,199.00"
            image={IphoneXs}
            onPress={() => navigation.navigate('ProductDetail', {
              productName: "Galaxy S24 Ultra",
              productPrice: "$1,199.00",
              productImage: IphoneXs,
              productBrand: "Samsung",
            })}
          />
          <ProductCard
            name="Iphone Xr 256GB Red"
            price="$1,199.00"
            image={IphoneXr}
            onPress={() => navigation.navigate('ProductDetail', {
              productName: "Galaxy S24 Ultra",
              productPrice: "$1,199.00",
              productImage: IphoneXr,
              productBrand: "Samsung",
            })}
          />
        </ScrollView>

        {/* Featured Phones 3 */}
        <Text style={styles.sectionTitle}>Oppo</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productRowHorizontal}>
        <ProductCard
            name="Oppo F9 Sunrise Red"
            price="$1,099.00"
            image={OppoF9}
            onPress={() => navigation.navigate('ProductDetail', {
              productName: "iPhone 15 Pro Max",
              productPrice: "$1,099.00",
              productImage: OppoF9,
              productBrand: "Apple",
            })}
          />
          <ProductCard
            name="Oppo R17 Pro Lavender"
            price="$1,199.00"
            image={OppoR17}
            onPress={() => navigation.navigate('ProductDetail', {
              productName: "Galaxy S24 Ultra",
              productPrice: "$1,199.00",
              productImage: OppoR17,
              productBrand: "Samsung",
            })}
          />
        </ScrollView>
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 40,  // Add some padding to the bottom for better scrolling experience
    marginTop: 20,
  },
  header: { fontSize: 22, fontWeight: '500', marginBottom: 30 },
  username: { fontWeight: '700', fontSize: 24},
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchInput: { flex: 1, fontSize: 16 },
  searchIcon: { marginLeft: 8 },
  banner: {
    backgroundColor: '#f27c1e',
    paddingVertical: 40,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  bannerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  productRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  productRowHorizontal: {
    paddingBottom: 8,
    paddingHorizontal: 8,
    gap: 12,
  },
});

export default Home;
