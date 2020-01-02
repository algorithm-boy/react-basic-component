export const createPropsGetter = <DP extends object>(defaultProps: DP) => {
  return <P extends Partial<DP>>(props: P) => {
    type PropsExcludingDefaults = Pick<P, Exclude<keyof P, keyof DP>>;

    type RecomposeProps = DP & PropsExcludingDefaults;

    return (props as any) as RecomposeProps;
  };
};

export default createPropsGetter;