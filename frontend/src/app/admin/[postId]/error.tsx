"use client";

import { Container } from "@/components/Container";
import { FC } from "react";

const ErrorView: FC = () => {
  return (
    <Container>
      <h2 style={{ color: "var(--color-error)" }}>Not Found</h2>
    </Container>
  );
};

export default ErrorView;
