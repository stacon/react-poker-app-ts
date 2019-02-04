const getRankUIRepresentation = (rank: number): string => {
  if(rank === 1) return 'A'
  if(rank === 11) return 'J'
  if(rank === 12) return 'Q'
  if(rank === 13) return 'K'
  return rank.toString();
}

export { getRankUIRepresentation }