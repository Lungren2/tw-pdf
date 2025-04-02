import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { tw, Tailwind } from '@react-pdf/tailwind';

// Create styles with react-pdf's StyleSheet
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
});

// Component using the tw() function directly
const TailwindDirectExample = () => {
  const [bgStyle, setBgStyle] = useState({});
  const [textStyle, setTextStyle] = useState({});
  const [buttonStyle, setButtonStyle] = useState({});
  
  useEffect(() => {
    // Process Tailwind classes
    const loadStyles = async () => {
      const bg = await tw('bg-blue-100 rounded-lg p-5');
      const text = await tw('text-blue-800 text-xl font-bold');
      const button = await tw('bg-blue-500 text-white rounded px-4 py-2 mt-4');
      
      setBgStyle(bg);
      setTextStyle(text);
      setButtonStyle(button);
    };
    
    loadStyles();
  }, []);
  
  return (
    <View style={[styles.section, bgStyle]}>
      <Text style={textStyle}>Using tw() function directly</Text>
      <View style={buttonStyle}>
        <Text>Button</Text>
      </View>
    </View>
  );
};

// Component using the Tailwind component
const TailwindComponentExample = () => (
  <Tailwind className="bg-green-100 rounded-lg p-5 m-2">
    <View style={styles.section}>
      <Tailwind className="text-green-800 text-xl font-bold">
        <Text>Using Tailwind component</Text>
      </Tailwind>
      
      <Tailwind className="bg-green-500 text-white rounded px-4 py-2 mt-4">
        <View>
          <Text>Button</Text>
        </View>
      </Tailwind>
    </View>
  </Tailwind>
);

// Main document component
const TailwindExample = () => (
  <Document>
    <Page style={styles.page}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Tailwind CSS Examples
      </Text>
      
      <TailwindDirectExample />
      <TailwindComponentExample />
      
      {/* Combining Tailwind with regular styles */}
      <Tailwind className="bg-purple-100 rounded-lg p-5 m-2">
        <View style={{ borderWidth: 1, borderColor: 'purple', padding: 10 }}>
          <Tailwind className="text-purple-800 text-xl font-bold">
            <Text>Combining styles</Text>
          </Tailwind>
          <Text style={{ marginTop: 10 }}>
            This example combines Tailwind classes with regular react-pdf styles.
          </Text>
        </View>
      </Tailwind>
    </Page>
  </Document>
);

export default {
  id: 'tailwind',
  name: 'Tailwind CSS',
  description: 'Using Tailwind CSS with react-pdf',
  Document: TailwindExample,
};
