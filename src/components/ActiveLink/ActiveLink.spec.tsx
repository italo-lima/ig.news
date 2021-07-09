import React from 'react';
import { render, screen } from '@testing-library/react';

import ActiveLink from '.';

jest.mock("next/router", () => ({
  useRouter() {
    return {
      asPath: "/"
    }
  }
}))

describe('ActiveLink component', () => {
  it('renders correctly', () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    )
    expect(screen.getByText('Home')).toBeInTheDocument();
  })

  it('renders with activeClassName when link is active', () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    )
    expect(screen.getByText('Home')).toHaveClass('active')
  })

  it('renders without activeClassName when link is not active', () => {
    render(
      <ActiveLink href="/other-path" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    )
    expect(screen.getByText('Home')).not.toHaveClass('active')
  })
})