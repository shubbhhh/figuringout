export interface Comment {
    children: [],
    claps: [],
    createdAt: string,
    id: string,
    message: string,
    parentId: string,
    postId: string,
    updatedAt: string,
    user?: {
        id: string,
        name: string,
        profilePic?: string,
    },
    userId: string,
}