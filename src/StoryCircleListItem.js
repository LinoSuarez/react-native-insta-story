import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import FastImage from "react-native-fast-image";

// Constants
import DEFAULT_AVATAR from "./assets/images/no_avatar.png";
const { width, height } = Dimensions.get("window");

// Components
class StoryCircleListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: this.props?.item?.seen,
      imageLoaded: false,
    };
  }

  // Component Functions
  _handleItemPress = (item) => {
    const { handleStoryItemPress } = this.props;

    if (handleStoryItemPress) handleStoryItemPress(item);

    this.setState({ isPressed: true });
  };

  handleImgLoaded = () => this.setState({ imageLoaded: true });

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.item.seen != this.props.item.seen) {
      this.setState({ isPressed: this.props.item.seen });
    }
  }

  render() {
    const { item, unPressedBorderColor, pressedBorderColor, avatarSize } =
      this.props;
    const { isPressed } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this._handleItemPress(item)}
          style={[
            styles.avatarWrapper,
            {
              height: avatarSize ? avatarSize + 4 : 64,
              width: avatarSize ? avatarSize + 4 : 64,
            },
            !isPressed
              ? {
                  borderColor: unPressedBorderColor
                    ? unPressedBorderColor
                    : "red",
                }
              : {
                  borderColor: pressedBorderColor ? pressedBorderColor : "grey",
                },
          ]}
        >
          {/* <Image
            style={{
              height: avatarSize ?? 60,
              width: avatarSize ?? 60,
              borderRadius: 100,
              borderWidth: 3,
              borderColor: "#121212",
            }}
            source={{ uri: item.user_image }}
            defaultSource={Platform.OS === "ios" ? DEFAULT_AVATAR : null}
          /> */}
          {/* {!this.state.isImgLoaded && (
            <FastImage
              style={{
                height: avatarSize ?? 60,
                width: avatarSize ?? 60,
                borderRadius: 100,
                borderWidth: 3,
                borderColor: "#121212",
              }}
              source={DEFAULT_AVATAR}
              resizeMode={FastImage.resizeMode.contain}
            />
          )} */}

          <FastImage
            style={{
              height: avatarSize ?? 60,
              width: avatarSize ?? 60,
              borderRadius: 100,
              borderWidth: 3,
              borderColor: "#121212",
            }}
            source={{
              uri: "https://gtechgroup.io/wp-content/uploads/2021/12/Global-Tech-Operations-logos_transparent.png",
            //   uri: item.user_image,
              priority: FastImage.priority.high,
            }}
            // resizeMode={FastImage.resizeMode.contain}
            // onLoadEnd={this.handleImgLoaded}

          />

        </TouchableOpacity>
      </View>
    );
  }
}

export default StoryCircleListItem;

const styles = StyleSheet.create({
  container: {
    // marginVertical: 5,
    // marginHorizontal: 5,
    marginRight: 10,
  },
  unPressedAvatar: {
    borderColor: "red",
  },
  pressedAvatar: {
    borderColor: "grey",
  },
  avatarWrapper: {
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "red",
    borderRadius: 100,
    height: 64,
    width: 64,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 100,
  },
  itemText: {
    textAlign: "center",
    fontSize: 9,
  },
});
