import React from 'react';
import { mocked } from "ts-jest/utils"
import { signIn, useSession } from "next-auth/client"
import { useRouter } from "next/router"
import { fireEvent, render, screen } from '@testing-library/react';

import { SubscribeButton } from '.';

jest.mock("next-auth/client")
jest.mock("next/router")

describe('Subscribe Button component', () => {
  const useSessionMocked = mocked(useSession)
  useSessionMocked.mockReturnValueOnce([null, false])

  it('renders correctly', () => {
    render(<SubscribeButton />)
    
    expect(screen.getByText('Subscribe now')).toBeInTheDocument();
  })
  
  it('redirect user to sign when not authenticated', () => {
    const signInMocked = mocked(signIn)
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now')
    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
  })
  
  it('redirects to posts when user already has a subscription', () => {
    const useRouterMocked = mocked(useRouter)
    const useSessionMocked = mocked(useSession)
    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce([
      {
        user: { name: "Jhon Doe", email: "jhon.doe@test.com" },
        activeSubscription: "fake-active-subscription",
        expires: "expires-fake"
      }, false])

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any)

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now')
    fireEvent.click(subscribeButton)

    expect(pushMock).toHaveBeenCalledWith("/posts")
  })
})