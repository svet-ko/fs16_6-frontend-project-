import { Container, Typography } from "@mui/material";
import React from "react";

const About = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h2" gutterBottom>
        About
      </Typography>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique
        labore asperiores molestiae vero laudantium incidunt esse deserunt
        eligendi, sequi iusto sunt quasi vel? Maxime magni ullam nulla,
        corrupti, labore at ex fuga qui ad molestiae officiis alias, maiores
        fugiat odit voluptas voluptatem! Eius unde, sed numquam est voluptatem
        laboriosam quaerat omnis earum aut repellendus exercitationem amet
        repellat quas. Ut quidem vel non qui molestiae minima, deserunt
        cupiditate asperiores recusandae! Assumenda vel mollitia ipsam
        exercitationem impedit dolores odio aut maiores nesciunt fugiat
        molestiae labore corrupti voluptate quasi deleniti delectus architecto
        sed provident, inventore quo itaque deserunt? Dolore perferendis minima
        maxime accusantium!
      </Typography>
    </Container>
  );
};

export default About;
