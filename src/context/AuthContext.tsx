'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// user interface
export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    createdAt: string;
    role?: 'customer' | 'admin';
}

// authentification state interface
export interface AuthState {
    isAuthentificated: boolean;
    isLoading: boolean;
    user: User | null;
    token: string | null;
    error: string | null;
}

// authentifion actions
type AuthAction =
    | { type: 'AUTH_START' }
    | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
    | { type: 'AUTH_FAILURE'; payload: { error: string } }
    | { type: 'AUTH_LOGOUT' }
    | { type: 'AUTH_CLEAR_ERROR' }
    | { type: 'AUTH_UPDATE_USER'; payload: { user: User } };
    
// initial authentification state
const initialState: AuthState = {
    isAuthentificated: false,
    isLoading: true, // start with loading to check existing session
    user: null,
    token: null,
    error: null,
};

// authentificaiton reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'AUTH_START':
            return {
                ...state,
                isLoading: true,
                error: null,
            };

        case 'AUTH_SUCCESS':
            return {
                ...state,
                isAuthentificated: true,
                isLoading: false,
                user: action.payload.user,
                token: action.payload.token,
                error: null,
            };

        case 'AUTH_FAILURE':
            return {
                ...state,
                isAuthentificated: false,
                isLoading: false,
                user: null,
                token: null,
                error: action.payload.error,
            };

        case 'AUTH_LOGOUT':
            return {
                ...state,
                isAuthentificated: false,
                isLoading: false,
                user: null,
                token: null,
                error: null,
            };

        case 'AUTH_CLEAR_ERROR':
            return {
                ...state,
                error: null,
            };
        
        default:
            return state;
    }
}

// context interface 
interface AuthContextType {
    state: AuthState;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: RegisterData) => Promise<void>;
    logout: () => void;
    clearError: () => void;
    updateUser: (userData: Partial<User>) => Promise<void>;
}

// registration data interface
export interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
}

// create the context
const AuthContext = createContext<AuthContextType | null>(null);

// auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // check for existing session on app load
    useEffect(() => {
        const checkExistingSession = async () => {
            try {
                const savedToken = localStorage.getItem('bioethanol-auth-token');
                const savedUser = localStorage.getItem('bioethanol-auth-user');

                if (savedToken && savedUser) {
                    //simulate token validation ( later replaced by API call)
                    await new Promise(resolve => setTimeout(resolve, 500));

                    // parse saved user data
                    const user = JSON.parse(savedUser);

                    // for now asssume token is valid ( later we will validate with API)
                    dispatch({
                        type: 'AUTH_SUCCESS',
                        payload: { user, token: savedToken }
                    });
                } else {
                    // no saved session set loading to false
                    dispatch( { type: 'AUTH_FAILURE', payload: { error: ''} });
                }
            } catch (error) {
                console.error('Session check failed:', error);
                //clear invalid data
                localStorage.removeItem('bioetahnol-auth-token');
                localStorage.removeItem('bioethanol-auth-user');
                dispatch({ type: 'AUTH_FAILURE' , payload: { error: 'Session expired' } });
            }
        };

        checkExistingSession();
    }, []);

    //login function (will use mock API for now)
    const login = async (email: string, password: string): Promise<void> => {
        dispatch({ type: 'AUTH_START' });

        try {
            //mock API call
            await new Promise(resolve => setTimeout(resolve, 800));

            //mock  user data ( later will  be replaced by PHP API)
            const mockUsers = [
                {
                id: 1,
                email: 'andreea@example.com',
                password: 'password123',
                firstName: 'Andreea',
                lastName: 'Ionescu',
                phone: '+44 20 1234 5678',
                createdAt: '2024-01-15T10:00:00Z',
                role: 'customer' as const
                },
                {
                id: 2,
                email: 'jack@example.com',
                password: 'password123',
                firstName: 'Jack',
                lastName: 'Kavanagh',
                phone: '+44 20 9876 5432',
                createdAt: '2024-02-20T14:30:00Z',
                role: 'customer' as const
                },
                {
                id: 3,
                email: 'casper-admin@bioethanol.com',
                password: 'admin123',
                firstName: 'Casper',
                lastName: 'Admin',
                createdAt: '2024-01-01T09:00:00Z',
                role: 'admin' as const
                }
            ];

            //find user by email and password
            const foundUser = mockUsers.find(
                user => user.email === email && user.password === password
            );

            if(!foundUser) {
                throw new Error('Invalid email or password');
            }

            //create user object (remove password)
            const { password: _, ...user } = foundUser;

            //generate mock JWT token
            const token = btoa(JSON.stringify({
                userId: user.id,
                email: user.email,
                exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
            }));

            //save to localStorage
            localStorage.setItem('bioethanol-auth-token', token);
            localStorage.setItem('bioethanol-auth-user', JSON.stringify(user));

            //update state
            dispatch({
              type: 'AUTH_SUCCESS',
              payload: { user, token }
            });
           
        } catch (error) {
            const ErrorMessage = error instanceof Error ? error.message : 'Login failed';
            dispatch({
                type: 'AUTH_FAILURE',
                payload: { error: ErrorMessage }
            });
            throw error;
        }
    };

    // register function ( will use mock API for now)
    const register = async (userData: RegisterData): Promise<void> => {
        dispatch({ type: 'AUTH_START' });

        try {
            //mock API call - simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            //simulate email validation
            if (userData.email === 'existing@example.com') {
                throw new Error('Email address is already registered');
            }

            // create new user (mock)
            const newUser: User= {
                id: Date.now(), //simple id generation for mock
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phone: userData.phone,
                createdAt: new Date().toISOString(),
                role: 'customer'
            };

            // generate mock jwt token
            const token = btoa(JSON.stringify({
                userId: newUser.id,
                email: newUser.email,
                exp: Date.now() + (24 * 60 * 60 * 1000) //24 hours
            }));

            // save to local storage
            localStorage.setItem('bioethanol-auth-token', token);
            localStorage.setItem('bioethanol-auth-user', JSON.stringify(newUser));

            // update state
            dispatch({
               type: 'AUTH_SUCCESS',
               payload: { user: newUser, token }  
            });

        } catch (error) {
            const ErrorMessage = error instanceof Error ? error.message : 'Registration failed';
            dispatch({
                type: 'AUTH_FAILURE',
                payload: { error: ErrorMessage }
            });
            throw error;
        }
    };

    // logout function 
    const logout = (): void => {
        //clear localStorage
        localStorage.removeItem('bioethanol-auth-token');
        localStorage.removeItem('bioethanol-auth-user');

        // update state
        dispatch({ type: 'AUTH_LOGOUT' });
    };

    //clear error fucntion
    const clearError = (): void => {
        dispatch({ type: 'AUTH_CLEAR_ERROR' });
    };

    //update user function (for profile updates)
    const updateUser = async (userData: Partial<User>): Promise<void> => {
        if(!state.user) {
            throw new Error('No user logged in');
        }

        try {
            //mock API call
            await new Promise(resolve => setTimeout(resolve, 500));

            const updatedUser = { ...state.user, ...userData };

            //update localStorage
            localStorage.setItem('bioethanol-auth-user', JSON.stringify(updateUser));

            //update state
            dispatch({
                type: 'AUTH_UPDATE_USER',
                payload: { user: updatedUser }
            });

        } catch (error) {
            const ErrorMessage = error instanceof Error ? error.message : 'Update failed';
            dispatch({
                type: 'AUTH_FAILURE',
                payload: {error: ErrorMessage}
            });
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{
            state,
            login,
            register,
            logout,
            clearError,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    );
}

// custom hook to use auth context
export function useAuth() {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }

    return context;
}

// helper function for components
export const authHelpers = {
    //check if user has specific role
    hasRole: (user: User | null, role: string): boolean => {
        return user?.role === role;
    },

    //get user display name
    getDisplayName: (user: User | null): string => {
        if (!user) return 'Guest';
        return `${user.firstName} ${user.lastName}`;
    },

    //check if token is expired (for mock tocken)
    isTokenExpired: (token: string | null): boolean => {
        if (!token) return true;

        try {
            const decoded = JSON.parse(atob(token));
            return Date.now() > decoded.exp;
        } catch {
            return true;
        }
    },
};