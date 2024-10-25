export interface IFormMasterUserRequestDto {
  username: string;
  nama_lengkap: string;
  no_hp: string;
}

export const intitalFormMasterUser: IFormMasterUserRequestDto = {
  username: "",
  nama_lengkap: "",
  no_hp: ""
};
