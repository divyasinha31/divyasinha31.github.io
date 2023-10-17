import { iComment, iReply } from "./app-model";

interface iCallAPIReq {
  comments: iComment[];
}

interface iGetCommentsResp {
  comments: iComment[];
}

interface iRespMetadata {
  id: string;
  private: boolean;
}

interface iCallAPIResp {
  record: iGetCommentsResp;
  metadata: iRespMetadata;
}

export {
  iGetCommentsResp,
  iCallAPIReq,
  iCallAPIResp
}