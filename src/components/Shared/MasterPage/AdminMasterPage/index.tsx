import { Header } from "./Header";
import { SideMenu } from "./SideMenu";
import { Container } from "./style";

export function AdminMasterPage(props: any) {
  return (
    <Container>
      <Header />
      {props.children}
      <SideMenu />
    </Container>
  );
}
