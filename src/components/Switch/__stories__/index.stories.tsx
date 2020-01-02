import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Switch from '../index';
import SwitchReadMe from '../README.md';
import './index.less';

class SwitchDemo extends React.PureComponent<any, any> {
  constructor (props: any) {
    super(props);
    this.state = {
      checked: true
    }
  }
  render () {
    const { checked } = this.state;

    return <Switch
      renderChecked='开'
      renderUnChecked='关'
      prefixCls='rc-switch'
      checked={checked}
      onClick={(checked, e) => {
        console.log('triggle click', e)
        this.setState({ checked: !checked })
      }}
    />
  }
}

storiesOf('Switch', module)
  .addParameters({
    readme: {
      sidebar: SwitchReadMe,
      highlightSidebar: true,
      codeTheme: 'github'
    },
  })
  .add('Basic', () => <Switch
    renderChecked='checked'
    renderUnChecked='unchecked'
  />)
  .add('Custom Style', () => <Switch
    renderChecked='开'
    renderUnChecked='关'
    prefixCls='rc-switch'
  />)
  .add('Custom Style - controlled checked', () => <SwitchDemo />)
  .add('Custom Style - defaultChecked', () => <Switch
    renderChecked='开'
    renderUnChecked='关'
    prefixCls='rc-switch'
    defaultChecked
  />)
  .add('Custom Style - autoFocus', () => <Switch
    renderChecked='开'
    renderUnChecked='关'
    prefixCls='rc-switch'
    autoFocus
  />)
  .add('Custom Style - disabled_unchecked', () => <Switch
    renderChecked='开'
    renderUnChecked='关'
    prefixCls='rc-switch'
    disabled
  />)
  .add('Custom Style - disabled_checked', () => <Switch
    renderChecked='开'
    renderUnChecked='关'
    prefixCls='rc-switch'
    defaultChecked
    disabled
  />);
