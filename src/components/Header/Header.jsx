import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Container, Logo, LogoutBtn } from '../index'

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const navItems = [
        {
            name: "Home",
            slug: '/',
            active: true
        },
        {
            name: "Login",
            slug: '/login',
            active: !authStatus
        },
        {
            name: "Signup",
            slug: '/signup',
            active: !authStatus
        },
        {
            name: "All Posts",
            slug: '/all-posts',
            active: authStatus
        },
        {
            name: "Add Post",
            slug: '/add-post',
            active: authStatus
        },
    ]

    return (
        <header className='py-3 shadow-md bg-[#161616]'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <Link to='/'>
                            <Logo width='75px' />
                        </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map((items) =>
                            items.active ?
                                <li key={items.name}>
                                    <button className='inline-block px-6 py-2 duration-200 rounded-full' onClick={() => navigate(items.slug)}>
                                        {items.name}
                                    </button>
                                </li> : null)}
                        {authStatus && (<li><LogoutBtn /></li>)}
                    </ul>
                </nav>
            </Container>

        </header>
    )
}

export default Header
