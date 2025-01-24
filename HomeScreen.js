import React, { useState, useRef } from 'react';
import {View,Text,StyleSheet,ScrollView,TouchableOpacity,FlatList,Dimensions,ImageBackground,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useProductContext } from './ProductContext'; // Importer le contexte

const { width } = Dimensions.get('window');

const HomeScreen = () => {
    const navigation = useNavigation();
    const { banners, couponProducts, offers, setSelectedProduct } = useProductContext(); // Récupérer les données du contexte
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);
// Fonction pour gérer le changement d'éléments visibles
    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index);
        }
    }).current;

    const handleProductPress = (product) => {
        setSelectedProduct(product); // Sauvegarder le produit sélectionné
        navigation.navigate('ProductDetail'); // Navigation vers la page de détails
    };

    const buttonLabels = [
        { label: "Boutique en ligne", icon: "store" },
        { label: "Voyages", icon: "airplane" },
        { label: "E-Mobilité", icon: "bike" },
        { label: "Recettes", icon: "chef-hat" },
        { label: "Vins", icon: "glass-wine" },
        { label: "Partenariats", icon: "handshake" },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>
                    <Text style={styles.boldText}>
                        <Text
                            style={[styles.linkText]}
                            onPress={() => navigation.navigate('Welcome')}
                        >
                            Se connecter ou S'inscrire
                        </Text>
                        <Text> pour profiter de tes avantages&nbsp;</Text>
                    </Text>
                    <Text style={styles.boldText}> !</Text>
                </Text>

                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.buttonScroll}
                >
                    {buttonLabels.map((button, index) => (
                        <TouchableOpacity key={index} style={styles.button}>
                            <MaterialCommunityIcons
                                name={button.icon}
                                size={16}
                                color="#007BFF"
                                style={styles.buttonIcon}
                            />
                            <Text style={styles.buttonText}>{button.label}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <FlatList
                    data={banners}
                    horizontal
                    ref={flatListRef}
                    pagingEnabled
                    snapToAlignment="center"
                    snapToInterval={width}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ImageBackground source={item.image} style={[styles.banner, { width }]}>
                            <Text></Text>
                            <View style={styles.dotsContainer}>
                                {banners.map((_, index) => (
                                    <View
                                        key={index}
                                        style={[
                                            styles.dot,
                                            { opacity: index === activeIndex ? 1 : 0.3 },
                                        ]}
                                    />
                                ))}
                            </View>
                        </ImageBackground>
                    )}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
                    decelerationRate="fast"
                />
            </View>

            <Text style={styles.bannerMessage}>{banners[activeIndex]?.text}</Text>

            <View style={styles.separator} />

            <View style={styles.couponSection}>
                <View style={styles.couponHeader}>
                    <Text style={styles.couponTitle}>Coupons</Text>
                    <TouchableOpacity style={styles.viewAllLink} onPress={() => navigation.navigate('AllCoupons')}>
                        <Text style={styles.viewAllText}>Affichez tout</Text>
                        <MaterialCommunityIcons name="chevron-right" size={20} color="#007BFF" />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={couponProducts}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.couponItem} onPress={() => handleProductPress(item)}>
                            <ImageBackground source={item.image} style={styles.couponImage}>
                                <View style={styles.specialOfferBadge}>
                                    <MaterialCommunityIcons name="star" size={16} color="#fff" />
                                    <Text style={styles.specialOfferText}>Offres spéciales</Text>
                                </View>
                            </ImageBackground>
                            <Text style={styles.couponProductName}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View style={styles.separator} />

            {/* Nouvelle section Offres avec produits en réduction */}
            <View style={styles.offerSection}>
                <View style={styles.offerHeader}>
                    <Text style={styles.offerTitle}>Offres</Text>
                    <TouchableOpacity style={styles.viewAllLink} onPress={() => navigation.navigate('AllOffers')}>
                        <Text style={styles.viewAllText}>Affichez tout</Text>
                        <MaterialCommunityIcons name="chevron-right" size={20} color="#007BFF" />
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                        data={offers}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.offerItem} onPress={() => handleProductPress(item)}>
                                <ImageBackground source={item.image} style={styles.offerImage}>
                                    <View style={styles.discountBadge}>
                                        <Text style={styles.discountText}>{item.discount}% OFF</Text>
                                    </View>
                                </ImageBackground>
                                <Text style={styles.offerProductName}>{item.name}</Text>
                                <Text style={styles.offerPrice}>{item.price}€</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <View style={styles.separator} />
                <View>
                    <Text style={styles.offerTitle}>Liste de courses</Text>
                    <Text>Ajoutez des articles et créez votre liste de courses</Text>
                    <TouchableOpacity style={styles.button1}>
                        <Text style={styles.buttonTexte}>Créer une liste</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.separator} />
            </View>
            <View style={styles.offerSection}>
                <View style={styles.offerHeader}>
                    <Text style={styles.offerTitle}>Catalogue</Text>
                    <TouchableOpacity
                        style={styles.viewAllLink}
                        onPress={() => navigation.navigate('Catalogue')}
                    >
                        <Text style={styles.viewAllText}>Affichez tout</Text>
                        <MaterialCommunityIcons name="chevron-right" size={20} color="#007BFF" />
                    </TouchableOpacity>
                </View>

                {offers && offers.length > 0 ? (
                    <FlatList
                        data={offers}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.offerItem}
                                onPress={() => handleProductPress(item)} // Navigue vers la page de détails
                            >
                                <ImageBackground source={item.image} style={styles.offerImage}>
                                    <View style={styles.discountBadge}>
                                        <Text style={styles.discountText}>{item.discount}% OFF</Text>
                                    </View>
                                </ImageBackground>
                                <Text style={styles.offerProductName}>{item.name}</Text>
                                <Text style={styles.offerPrice}>{item.price}€</Text>
                                
                            </TouchableOpacity>
                            
                        )}
                    />
                ) : (
                    <Text style={styles.emptyText}>Aucune offre disponible</Text>
                )}
            </View>
            <View style={styles.separator2} />
            <View style={styles.separator1}>
                <Text style={styles.footer}>
                    Les réductions de prix mentionnées sur cette page sont valables uniquement pendant les jours
                    indiqués et dans la limite des stocks disponibles. Les stocks par magasins étant limités, il est
                    possible que certains articles soient épuisés prématurément. TVA et cotisation de recyclage
                    comprises dans le prix. Les articles illustrés peuvent présenter des différences aux articles en
                    magasin.
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        backgroundColor: '#f5f5f5',
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
    },

    buttonTexte: {
        color: 'blue',
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 0,
        textAlign: 'center',
    },
    header: {
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 18,
        color: '#333',
        paddingHorizontal: 20,
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000',
    },
    linkText: {
        color: '#007BFF',
        fontWeight: 'bold',
        fontSize: 20,
    },
    buttonScroll: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    footer: {
        fontSize: 12,           // Taille de police petite
        color: 'grey',           // Couleur grise
        lineHeight: 18,          // Ajustement pour espacement entre les lignes, facultatif
        textAlign: 'left',
        marginLeft: 15,
        marginRight: 15,
        // Centrage du texte, facultatif
    },
    button: {
        backgroundColor: '#fff',
        borderColor: '#888',
        borderWidth: 0.5,
        borderRadius: 7,
        paddingVertical: 7,
        marginRight: 8,
        minWidth: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    button1: {
        backgroundColor: '#fff',
        borderColor: 'blue',
        borderWidth: 0.5,
        borderRadius: 0,
        paddingVertical: 7,
        minWidth: 100,
        width: 320,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 10,
        textAlign: 'center',
    },
    buttonIcon: {
        marginRight: 5,
    },
    buttonText: {
        color: '#000',
        fontSize: 12,
        fontWeight: 'bold',
    },
    banner: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 180,
        marginVertical: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    dot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: '#000',
        marginHorizontal: 4,
    },
    bannerMessage: {
        marginTop: 15,
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    separator: {
        height: 10,
        backgroundColor: '#EFEFEF',
    },
    separator1: {
        height: 200,
        backgroundColor: '#EFEFEF',
    },
    separator2: {
        height: 40,
    },
    couponSection: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    couponHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    couponTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    viewAllLink: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewAllText: {
        color: '#007BFF',
        fontSize: 14,
        marginRight: 4,
    },
    couponItem: {
        marginRight: 15,
        width: 120,
        borderRadius: 10,
        overflow: 'hidden',
    },
    couponImage: {
        width: '100%',
        height: 150,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    specialOfferBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF0000',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 3,
        marginTop: 5,
    },

    specialOfferText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    offerSection: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    offerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    offerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    offerItem: {
        marginRight: 15,
        width: 120,
        borderRadius: 10,
        overflow: 'hidden',
    },
    offerImage: {
        width: '100%',
        height: 150,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    discountBadge: {
        backgroundColor: '#FF6347',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 3,
        marginTop: 5,
    },
    discountText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    offerProductName: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 14,
        fontWeight: 'bold',
    },
    offerPrice: {
        textAlign: 'center',
        fontSize: 13,
        color: '#FF6347',
        fontWeight: 'bold',
    },
});

export default HomeScreen;
