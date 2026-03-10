import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useUserProfile = () => {
    const token = localStorage.getItem('token');

    return useQuery({
        queryKey: ['userProfile', token],
        queryFn: async () => {
            const { data } = await axios.get('http://localhost:5000/api/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        },
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: true,
        retry: 1,
        enabled: !!token,
    });
};

export default useUserProfile;
