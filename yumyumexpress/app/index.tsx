import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import CategorySection from "@/components/CategorySection";
import RestaurantSection from "@/components/RestaurantSection";

const Page = () => {
  return (
    <SafeAreaView style={{ top: 100, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <CategorySection />
        <Text style={styles.header}>Top picks in your neighbourhood</Text>
        <RestaurantSection />
        <Text style={styles.header}>Offers near you</Text>
        <RestaurantSection />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
});
