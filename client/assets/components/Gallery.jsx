import React from "react";
import { View, Text, Button, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

export const Gallery = ({ title }) => {
	const [showGallery, setShowGallery] = useState(false);
	const [declineGallery, setDeclineGallery] = useState(false);

	const openGallery = () => {
		console.log("CLICKED");
		setShowGallery((prev) => !prev);
	};

	const notNow = () => {
		console.log("CLICKED");
		setDeclineGallery((prev) => !prev);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.titleText}>{title}</Text>
			<Text style={styles.description}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet quam sequi voluptate qui sed
				laborum tempora quo nihil quas porro voluptatem distinctio sapiente voluptates provident,
				perspiciatis aliquid consequuntur modi non?
			</Text>
			<Pressable onPress={openGallery} style={styles.galleryBtn}>
				<Text style={styles.galleryBtnText}>Enable Gallery</Text>
			</Pressable>
			<Pressable onPress={notNow} style={styles.declineBtn}>
				<Text style={styles.declineBtnText}>Not now</Text>
			</Pressable>
			{showGallery ? <Text>Open up gallery</Text> : null}
			{declineGallery ? <Text>Leave this page</Text> : null}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: 50,
		top: 170
	},
	titleText: {
		color: "#69acfb",
		fontSize: 30,
		fontWeight: "600",
	},
	description: {
		width: 200,
	},
	galleryBtn: {
		backgroundColor: "#47bffd",
		borderWidth: 2,
		borderRadius: 10,
		borderColor: "transparent",
		marginTop: 20,
		width: 200,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	galleryBtnText: {
		color: "#ffffff",
		padding: 10,
		fontWeight: "bold",
	},
	declineBtn: {
		backgroundColor: "#ffffff",
		borderWidth: 2,
		borderRadius: 10,
		borderColor: "#47bffd",
		marginTop: 20,
		width: 200,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	declineBtnText: {
		color: "#47bffd",
		padding: 10,
		fontWeight: "bold",
	},
});
