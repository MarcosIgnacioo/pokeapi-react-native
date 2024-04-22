import { View } from "react-native";
import "./styles.css";
import Card from "./Card";
import { ScrollView } from "react-native-web";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Card />
      </ScrollView>
    </View>
  );
}
