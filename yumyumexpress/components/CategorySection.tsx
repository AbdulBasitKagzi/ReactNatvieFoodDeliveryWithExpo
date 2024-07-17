import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { categories } from "@/assets/data/home";

const CategorySection = () => {
  return (
    <View>
      <ScrollView horizontal contentContainerStyle={{ padding: 15 }}>
        {categories.map((category) => (
          <View style={[styles.categoryCard, { flex: 1 }]}>
            <Image source={category.img} />
            <Text style={[styles.categoryText]}>{category.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategorySection;

const styles = StyleSheet.create({
  categoryCard: {
    width: 100,
    backgroundColor: "#fff",
    marginEnd: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    borderRadius: 4,
  },
  categoryText: {
    padding: 6,
    fontSize: 14,
    fontWeight: "bold",
  },
});
