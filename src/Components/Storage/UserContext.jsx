import React from 'react';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [alunosData, setAlunosData] = React.useState(null);
  const [infoUser, setInfoUser] = React.useState(null);
  const [refresh, setRefresh] = React.useState(false);

  React.useEffect(() => {
    //  console.log(infoUser);
  }, [infoUser]);

  return (
    <UserContext.Provider
      value={{
        alunosData,
        setAlunosData,
        infoUser,
        setInfoUser,
        refresh,
        setRefresh,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
