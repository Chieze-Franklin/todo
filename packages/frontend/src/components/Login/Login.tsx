const Login = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        console.log(email, password);

        fetch(`${import.meta.env.VITE_SERVER_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.token) {
                    sessionStorage.setItem('token', data.token);
                    window.location.reload();
                }
            });
    }

    return (
        <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col justify-between p-7 min-h-[550px] rounded-xl'>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">#ToDo</h1>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder='Email address'
                                // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                className='block w-full bg-transparent rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 flex-1 h-14 pl-6 pr-2 placeholder:text-slate-400'
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                className='block w-full bg-transparent rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 flex-1 h-14 pl-6 pr-2 placeholder:text-slate-400'
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            // className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            className="flex w-full justify-center px-3 py-1.5 text-sm border-none rounded-full bg-orange-600 text-white font-medium cursor-pointer"
                        >Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
