import { StyleSheet, Text, View } from "react-native";
import { Gallery } from "./assets/components/Gallery";

export default function App() {
	const tempString = "Allow your gallery";

	return (
		<View style={styles.container}>
			<Gallery title={tempString} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
