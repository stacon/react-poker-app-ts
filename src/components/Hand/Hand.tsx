import React from 'react';
import CardProperties from '../../classes/CardProperties';
import SingleCard from '../SingleCard/SingleCard';

interface HandProps {
  cards: CardProperties[]
}

const renderCardSet = (cards:CardProperties[]) => (
  cards.map((card: CardProperties) => (
    <li>
      <SingleCard
      card={card}
      flipped={true}
      onFlippingCard={ () => {console.log(`${card.rank} of ${card.suit} clicked!`)}}
    />
    </li>
)))

const Hand = (props: HandProps) => (
  <ul className="hand">
    {renderCardSet(props.cards)}
  </ul>
)

export default Hand;