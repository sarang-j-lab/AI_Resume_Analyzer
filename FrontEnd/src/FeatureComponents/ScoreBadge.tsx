interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeColor = '';
  let badgeText = '';

  if (score > 70) {
    badgeColor = 'border-green border-1 text-green-600';
    badgeText = 'Strong';
  } else if (score > 49) {
    badgeColor = 'border-yellow border-1 text-yellow-600';
    badgeText = 'Good Start';
  } else {
    badgeColor = 'border-red border-1 text-red-600';
    badgeText = 'Needs Work';
  }

  return (
    <div className={`px-3 py-1 rounded-full ${badgeColor}`}>
      <p className="text-xs font-medium">{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;