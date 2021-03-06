import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { InjectSingle } from '../index';

const FooContext = React.createContext<string>("foo");

interface ComponentProps {
  foo: string;
  bar: string;
  baz: string;
  moo: string;
}

const Component = InjectSingle(
  FooContext,
  "foo",
  class Component extends React.Component<ComponentProps, {}> {
    public render() {
      return (
        <>
          {this.props.foo}
          {this.props.bar}
          {this.props.baz}
          {this.props.moo}
        </>
      );
    }
  }
);

it('single InjectSingle call injects correctly', () => {
  const renderer = TestRenderer.create(
    <FooContext.Provider value="foo2">
      <Component bar="bar" baz="baz" moo="moo" />
    </FooContext.Provider>
  );

  expect(renderer.toJSON()).toMatchSnapshot();
});
