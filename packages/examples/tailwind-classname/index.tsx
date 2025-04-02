import React from 'react';
import { StyleSheet } from '@react-pdf/renderer';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  Link
} from '@react-pdf/tailwind';

// Create styles with react-pdf's StyleSheet for comparison
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
});

// Main document component
const TailwindClassNameExample = () => (
  <Document>
    <Page className="p-8 bg-white">
      <Text className="text-3xl font-bold text-center text-blue-600 mb-6">
        Tailwind CSS with className
      </Text>
      
      {/* Card with Tailwind classes */}
      <View className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
        <Text className="text-xl font-semibold text-gray-800 mb-2">
          Using className directly
        </Text>
        <Text className="text-gray-600 mb-4">
          This example demonstrates using Tailwind classes directly with the className prop.
        </Text>
        <View className="bg-blue-500 rounded-md p-2">
          <Text className="text-white text-center">Button with Tailwind</Text>
        </View>
      </View>
      
      {/* Combining className with style prop */}
      <View 
        className="bg-green-100 rounded-lg p-4 mb-6"
        style={{ borderWidth: 1, borderColor: 'green' }}
      >
        <Text className="text-green-800 font-medium mb-2">
          Combining className with style prop
        </Text>
        <Text className="text-green-700">
          You can combine Tailwind classes with regular react-pdf styles.
        </Text>
      </View>
      
      {/* Grid layout with Tailwind */}
      <View className="flex flex-row flex-wrap">
        <View className="w-1/2 p-2">
          <View className="bg-purple-100 p-4 rounded">
            <Text className="text-purple-800 font-bold">Column 1</Text>
            <Text className="text-purple-600">Using flex layout</Text>
          </View>
        </View>
        <View className="w-1/2 p-2">
          <View className="bg-indigo-100 p-4 rounded">
            <Text className="text-indigo-800 font-bold">Column 2</Text>
            <Text className="text-indigo-600">With Tailwind classes</Text>
          </View>
        </View>
      </View>
      
      {/* Link example */}
      <Link
        src="https://tailwindcss.com"
        className="text-blue-500 underline mt-6 text-center"
      >
        Learn more about Tailwind CSS
      </Link>
    </Page>
  </Document>
);

export default {
  id: 'tailwind-classname',
  name: 'Tailwind CSS with className',
  description: 'Using Tailwind CSS with className prop',
  Document: TailwindClassNameExample,
};
