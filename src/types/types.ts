export type PostType = {
    id:string,
    body:string,
    createdAt:Date,
    createdById:string,
    likes:number,
    likedByIds:string[]
}