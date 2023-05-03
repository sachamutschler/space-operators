// Used to save data of main user into db
export interface User {
    uuid: string,
    name: string
  }
  export const User = (
    uuid: string,
    name: string
  
  ): User => ({
    uuid,
    name
  });