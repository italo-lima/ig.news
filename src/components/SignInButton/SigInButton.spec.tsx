import React from 'react';
import { mocked } from "ts-jest/utils"
import { useSession } from "next-auth/client"
import { render, screen } from '@testing-library/react';

import { SignInButton } from '.';

jest.mock("next-auth/client")

describe('SignIn Button component', () => {
  it('renders correctly when user is not authenticated', () => {
    //mockReturnValueOnce -> o resultado serve apenas para esse teste
    //mockReturnValue -> o resultado será igual em todos os testes
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])
    
    render(<SignInButton />)
    
    expect(screen.getByText('Sign in with Github')).toBeInTheDocument();
  })
  
  it('renders correctly when user is authenticated', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([
      {
        user: { name: "Jhon Doe", email: "jhon.doe@test.com" },
        expires: "expires-fake"
      }, false])
      
      render(<SignInButton />)
      
      expect(screen.getByText('Jhon Doe')).toBeInTheDocument();
    })
  })