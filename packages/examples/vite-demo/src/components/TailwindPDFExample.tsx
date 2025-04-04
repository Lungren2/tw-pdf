import { Document, Page, Text, View, StyleSheet } from "tw-pdf"

// Create styles with react-pdf's StyleSheet
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
})

// Component using className directly on react-pdf primitives
const TailwindComponentExample = () => (
  <View className='bg-green-100 rounded-lg p-5 m-2'>
    <View style={styles.section}>
      <Text className='text-green-800 text-xl font-bold'>
        Using className directly
      </Text>

      <View className='bg-green-500 text-white rounded px-4 py-2 mt-4'>
        <Text>Button Example</Text>
      </View>
    </View>
  </View>
)

// Card component with Tailwind classes directly on primitives
const Card = ({ title, color }: { title: string; color: string }) => (
  <View className={`bg-${color}-100 rounded-lg p-5 m-2`}>
    <Text className={`text-${color}-800 text-lg font-bold mb-2`}>{title}</Text>
    <Text className='text-gray-700'>
      This is a card component using Tailwind CSS classes directly on Text
      component.
    </Text>
  </View>
)

// Main document component
const TailwindPDFExample = () => (
  <Document>
    <Page style={styles.page}>
      <View className='bg-white p-5'>
        <Text className='text-2xl font-bold mb-5'>tw-pdf Example Document</Text>

        <TailwindComponentExample />

        {/* Cards with different colors */}
        <Card title='Information Card' color='blue' />
        <Card title='Success Card' color='green' />
        <Card title='Warning Card' color='yellow' />
        <Card title='Error Card' color='red' />

        {/* Combining Tailwind with regular styles */}
        <View className='bg-purple-100 rounded-lg p-5 m-2'>
          <View style={{ borderWidth: 1, borderColor: "purple", padding: 10 }}>
            <Text className='text-purple-800 text-xl font-bold'>
              Combining Styles
            </Text>
            <Text style={{ marginTop: 10 }}>
              This example combines Tailwind classes with regular react-pdf
              styles.
            </Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
)

export default TailwindPDFExample
