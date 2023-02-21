import { Post } from "../../atoms/postAtom";
import { Divider, Flex, Icon, Image, Skeleton, Spinner, Stack, Text, } from "@chakra-ui/react";
import { NextRouter } from "next/router";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { IoArrowDownCircleOutline, IoArrowDownCircleSharp, IoArrowRedoOutline, IoArrowUpCircleOutline, IoArrowUpCircleSharp, IoBookmarkOutline } from "react-icons/io5";
import moment from "moment";
import { useState } from "react";


type PostItemProps = {
    post: Post;
    userIsCreator: boolean;
    userVoteValue?: number;
    onVote: () => {};
    onDelete: () => {};
    onSelectPost: () => void;
};

const PostItem: React.FC<PostItemProps> = ({ post, userIsCreator, userVoteValue, onVote, onDelete, onSelectPost }) => {
    const [loadingImage, setLoadingImage] = useState(true);

    return (
        <Flex border="1px solid" borderColor="gray.300" bg="white" borderRadius={4} _hover={{ borderColor: "gray.400" }} onClick={onSelectPost}>
            <Flex direction="column" align="center" bg="gray.100" p={2} width="40px" borderRadius={4}>
                <Icon
                    as={userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline}
                    color={userVoteValue === 1 ? "brand.100" : "gray.400"}
                    fontSize={22}
                    onClick={onVote}
                    cursor="pointer"
                />
                <Text fontSize="10pt">{post.voteStatus}</Text>
                <Icon
                    as={userVoteValue === -1 ? IoArrowDownCircleSharp : IoArrowDownCircleOutline}
                    color={userVoteValue === -1 ? "#4379FF" : "gray.400"}
                    fontSize={22}
                    onClick={onVote}
                    cursor="pointer"
                />
            </Flex>
            <Flex direction="column" width="100%">
                <Stack spacing={1} p="10px">
                    <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
                        {/* Home Page Check */}
                        <Text>Posted by u/{post.creatorDisplayName}</Text>
                        <Text pl={1} color="gray.500">{moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}</Text>
                    </Stack>
                    <Divider />
                    <Text fontSize="12pt" fontWeight={600} cursor="pointer">
                        {post.title}
                    </Text>
                    <Text fontSize="10pt">{post.body}</Text>
                    {post.imageURL && (
                        <Flex justify="center" align="center" p={2} cursor="pointer">
                            {loadingImage && <Skeleton height="200px" width="100%" borderRadius={4} />}
                            <Image
                                src={post.imageURL}
                                maxHeight="460px"
                                alt="Post Image"
                                onLoad={() => setLoadingImage(false)}
                                display={loadingImage ? "none" : "unset"}
                            />
                        </Flex>
                    )}
                </Stack>
                <Flex ml={1} mb={0.5} color="gray.500" >
                    <Flex align="center" p="8px 10px" borderRadius={4} _hover={{ bg: "gray.200" }} cursor="pointer">
                        <Icon as={BsChat} mr={2} />
                        <Text fontSize="9pt">{post.numberOfComments}</Text>
                    </Flex>
                    <Flex align="center" p="8px 10px" borderRadius={4} _hover={{ bg: "gray.200" }} cursor="pointer">
                        <Icon as={IoArrowRedoOutline} mr={2} />
                        <Text fontSize="9pt">Share</Text>
                    </Flex>
                    <Flex align="center" p="8px 10px" borderRadius={4} _hover={{ bg: "gray.200" }} cursor="pointer">
                        <Icon as={IoBookmarkOutline} mr={2} />
                        <Text fontSize="9pt">Save</Text>
                    </Flex>
                    {userIsCreator && (
                        <Flex align="center" p="8px 10px" borderRadius={4} _hover={{ bg: "gray.200" }} cursor="pointer" onClick={onDelete}>
                            <Icon as={AiOutlineDelete} mr={2} />
                            <Text fontSize="9pt">Delete</Text>
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Flex>
    )
}
export default PostItem;