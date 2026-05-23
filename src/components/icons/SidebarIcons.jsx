const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function IconDashboard(props) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function IconPengaturan(props) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

export function IconAPI(props) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3.6" y1="7" x2="20.4" y2="7" />
      <line x1="3.6" y1="17" x2="20.4" y2="17" />
    </svg>
  );
}

export function IconIqomah(props) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="12" cy="13" r="9" />
      <path d="M12 8v5l3.5 2" />
      <path d="M9 2h6" />
    </svg>
  );
}

export function IconPengumuman(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M3 11v2a5 5 0 0 0 5 5h1l1.5 3h1L13 18h1a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3H8a5 5 0 0 0-5 5Z" />
      <path d="M21 5c-1.5 1-3 1.5-5 2v6c2 .5 3.5 1 5 2V5Z" />
    </svg>
  );
}

export function IconCuaca(props) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 17a4 4 0 0 1 4-4h6a4 4 0 0 1 0 8H9a4 4 0 0 1-4-4Z" />
    </svg>
  );
}
