export interface Notice {
  NOTICE_IDX: number;
  NOTICE_SUBJ: string;
  NOTICE_CONT: string;
  REGR_ID: string;
  REG_DT: string;
}

export interface NoticeListProps {
  onNoticeClick: (notice: Notice) => void;
  onEditClick: (notice: Notice) => void;
}

export interface NoticePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface NoticeEditPopupProps {
  isOpen: boolean;
  notice: Notice | null;
  onClose: () => void;
  onSave: () => void;
}

export interface NoticeDetail {
  NOTICE_IDX: number;
  NOTICE_SUBJ: string;
  NOTICE_CONT: string;
  REGR_ID: string;
  REG_DT: string;
}

export interface NoticeDetailPopupProps {
  isOpen: boolean;
  notice: NoticeDetail | null;
  onClose: () => void;
  error: string | null;
  isLoading: boolean;
}
