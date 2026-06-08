import { Pressable } from 'react-native';
import { View, Text} from 'react-native';
function Post({post}){
    return(
        <View>
            <Text>{post.data.owner}</Text>
            <Text>{post.data.descripcionPost}</Text>
            {/* <Pressable onPress={darLike}>
                <Text>Like</Text>
            </Pressable> */}
        </View>
    )
}
export default Post;