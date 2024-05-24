// src/Card.tsx
import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

interface CardProps {
  title: string;
}

const CardComponent: React.FC<CardProps> = ({ title }) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={title} src="https://via.placeholder.com/150" />}
    >
      <Meta title={title} />
    </Card>
  );
};

export default CardComponent;
