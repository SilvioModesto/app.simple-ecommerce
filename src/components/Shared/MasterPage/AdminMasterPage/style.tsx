import styled from "@emotion/styled";
import { List, ListItem } from "@mui/material";

export const Container = styled.div `
  margin-top: 80px;
  margin-left: 20px;
  margin-right: 20px;
`;

export const ListCustom = styled(List) `
  width: 400px;
`;

export const ListItemBack = styled(ListItem) `
  cursor: pointer;
  background-color: #1976d2;
  color: white;
  margin-top: -8px;
  height: 64px;
`;