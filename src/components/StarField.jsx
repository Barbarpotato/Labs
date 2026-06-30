import { useMemo } from 'react';
import { Box } from '@chakra-ui/react';

const genShadow = (count, opacity) => {
    const s = [];
    for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * 2560);
        const y = Math.floor(Math.random() * 2560);
        s.push(`${x}px ${y}px rgba(255,255,255,${opacity})`);
    }
    return s.join(', ');
};

export default function StarField() {
    const s1 = useMemo(() => genShadow(160, 0.55), []);
    const s2 = useMemo(() => genShadow(80, 0.45), []);
    const s3 = useMemo(() => genShadow(40, 0.35), []);

    const base = {
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: '50%',
        pointerEvents: 'none',
    };

    return (
        <Box position="absolute" inset={0} overflow="hidden" pointerEvents="none" zIndex={0}>
            <Box sx={{ ...base, width: '1px', height: '1px', boxShadow: s1, animation: 'stars-drift 60s linear infinite' }} />
            <Box sx={{ ...base, width: '2px', height: '2px', boxShadow: s2, animation: 'stars-drift 100s linear infinite' }} />
            <Box sx={{ ...base, width: '3px', height: '3px', boxShadow: s3, animation: 'stars-drift 200s linear infinite' }} />
        </Box>
    );
}
