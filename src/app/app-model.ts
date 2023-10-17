interface iReply {
  name: string;
  reply: string;
}

interface iComment {
  name: string;
  comment: string;
  time: number;
  showReply: boolean;
  replies?: iReply[];
}

export {
  iReply,
  iComment
}