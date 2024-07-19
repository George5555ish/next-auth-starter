import React from 'react'
import BackButton from './auth/BackButton'
import Header from './auth/Header'
import { Card,CardHeader,CardFooter } from './ui/card'

function ErrorCard() {
  return (
    <Card>
        <CardHeader>
            <Header label={'Oops! Something Went wrong'} />
        </CardHeader>
        <CardFooter>
            <BackButton label='Back to Login' href='/auth/login' />
        </CardFooter>
    </Card>
  )
}

export default ErrorCard