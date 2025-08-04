'use client';

import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import { RiArrowUpSLine } from 'react-icons/ri';

export default function Subjects() {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

   const subjects = {
       igcse: [
            {
                name: 'Accounting - 0452',
                notes: 'https://drive.google.com/drive/folders/1JslnsysjxGZet2uP7svo4JwAPUJQQOiE?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1jlgfcZDyAgIFoULln_pXCOwDEL4kwBMw?usp=drive_link',
                cs:'https://drive.google.com/drive/folders/1M4329kQ2AHES6F4mM7HL3c4W5Te8-qK3?usp=drive_link'
            },
            {
                name: 'Art & Design - 0400',
                notes: 'https://drive.google.com/drive/folders/1MYy2BGjlqvjYD3BYtFgNcKkVE2mHH5_w?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1SV7sbjkF8vTvU530duvwIrGcRS2q-39n?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1kzQD37rdFuaFVBnLLPGxr3UxVtvROhLO?usp=drive_link'
            },
            {
                name: 'Biology - 0610',
                notes: 'https://drive.google.com/drive/folders/1KcM8gHaAjWyVUKv5SQZAGXv8Nnsxqmut?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/10WzwS9alM8QmtYBn2ynfjZZhBYmFRTWC?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1W65oCkY0lHU5OkNVIAiW-qLAcVber4PV?usp=drive_link'
            },
            {
                name: 'Business Studies - 0450',
                notes: 'https://drive.google.com/drive/folders/1Kr87He-Iz35m2NLkjfg9BMHMBx8CXws3?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1NZ7hCTR69GfKNC9HvkhsD-7NO-rbfNP7?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1vf9GM5EYdL4DyeOOUOQgtkszMLl0ZLm-?usp=drive_link'
            },
            {
                name: 'Chemistry - 0620',
                notes: 'https://drive.google.com/drive/folders/1L4osNGmF6RyhlxDlVClkTd5RWBXzx3if?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1hWn04Rene2F42dROd6SzdfdDO1ExSRnc?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1paF1m_rZHGOMEs7uI3dEMN2lFS5V_Wue?usp=drive_link'
            },
            {
                name: 'Computer Science - 0478',
                notes: 'https://drive.google.com/drive/folders/16FhF1jvQM19zeU50WvkJSh_rdy50nWEA?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1GzONJOVnTDRqtv0qiAD7oQBbWe7HekOZ?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1cICMQ62BhoImWlOQhtlJ5UjLJZDLr9lS?usp=drive_link'
            },
            {
                name: 'Drama - 0411',
                notes: 'https://drive.google.com/drive/folders/13IoYaoGe_cUoqrjhDpWXlL4gM042eMv0?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1zFLFaXb3etX5sQs_MlWsZVBZdv6tQy5k?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1e6VtxXT9MUMTAGQZEOTqAMaEAgH4ioB2?usp=drive_link'
            },
            {
                name: 'Economics - 0455',
                notes: 'https://drive.google.com/drive/folders/19w65XeCXIQUrf__qviRzQYaAt_isy9rM?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1iutakf9XuuAGtEvPwIVkSnC7uRcBjVf2?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1NxAOXkHybb_gUTQ-e_iViXMEEFTb-EOM?usp=drive_link'
            },
            {
                name: 'English - First Language - 0500',
                notes: 'https://drive.google.com/drive/folders/1__IfYqkbffOf92t26wfUGBrfzgIXe1iN?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1ZNcB1vU710jHqrfxnTeAYrZLEK6-f9jY?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1LXNI9dYwprJmEmkgUPUBVFOS8JHFPh03?usp=drive_link'
            },
            {
                name: 'English - Literature in English - 0475',
                notes: 'https://drive.google.com/drive/folders/1fPAUU8_6tmUDDvXnLyemz5ynv-eptXFm?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1D735WYzcFg7nzKk1Kcby6TdbwEKLf-ZH?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1FDmX0cQMqSJVAqv6CNJKUeiA4AxQWIFL?usp=drive_link'
            },
            {
                name: 'Enterprise - 0454',
                notes: 'https://drive.google.com/drive/folders/1XCn0uZMEmHWTimTnNo9y2ylGUqM1t6yB?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1oW2tSi53L2svlOApgt63Qkffl6Dey0Kp?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1XF31luGgCMvWiGtn5eQgnjBOXnwuo6SS?usp=drive_link'
            },
            {
                name: 'French - Foreign Language - 0520',
                notes: 'https://drive.google.com/drive/folders/19y8hlw5HOTr_mQEat0kqRWMGJNY0jyXG?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1VYYXmg65SdVzFZ2_AE0XhwglhfpshEMQ?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1a56jZ4uj7fkhp7L-Em_HhiLUSIrmUfuS?usp=drive_link'
            },
            {
                name: 'Geography - 0460',
                notes: 'https://drive.google.com/drive/folders/1Ry5eDu4zVdRdsK2drtZ2_GPLqbQeowJX?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1H7TkUYxkmYLVkIBrA96Mt6bBq6fJdPtu?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1cr5guaA4Bm0IAqfLdZd52mZDaGowoe-J?usp=drive_link',
                caseStudies:'https://drive.google.com/drive/folders/14wkTWGxQMUSXIlAdLE0_oCtX2M3TmeqR?usp=drive_link'
            },
            {
                name: 'Global Perspectives - 0457',
                notes: 'https://drive.google.com/drive/folders/1MHwSQH707oUv5ljpI2y7x-TEk10FUjTj?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1fJAsdm-mmF4MrHnHuaSWae59wnUEjHup?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1TrhTHSkZoOqjYAKl3KCbKtMYCFqAponi?usp=drive_link'
            },
            {
                name: 'History - 0470',
                notes: 'https://drive.google.com/drive/folders/1GLcFyM773R0dFww7XYQppxYD18sA2BXJ?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1iyd1K5-9WfBEwwWz8RxsvYyd-ntl-cS3?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1MV8T9wdhBVSsuloXYe9YaU8HxpSJGOWZ?usp=drive_link'
            },
            {
                name: 'Information Communication and Technology - 0417',
                notes: 'https://drive.google.com/drive/folders/19zsUJ7ElSYeAgR6cM9qbAEJalgDO08KE?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1sb2LSZKHZZh1_hEUPi6TNLos9I_FAedt?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1Dfj0dPvOOJq3uwbhA_IVd73buuHXFSu3?usp=drive_link'
            },
            {
                name: 'Mathematics - Additional - 0606',
                notes: 'https://drive.google.com/drive/folders/1KIO1GZKqu6rLuDVqye2STKMGojr7uWw3?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1tgdPn_tiKjuOJTk0hyEn54O22_TzXGxV?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1RrnFzGXPB7BxlzLgsBCio4n4iLS7btBJ?usp=drive_link'
            },
            {
                name: 'Mathematics - 0580',
                notes: 'https://drive.google.com/drive/folders/1_miU7Eqf7yaKvnEcU2_zVB63eH8eWEyJ?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1BaYnCZ6FQz49xOb60-aK1IuLY8ARAjpD?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1pPKrZm4NrjKqz3iWxsBrUxy6e-WQ-f-b?usp=drive_link',
                topical:'https://drive.google.com/drive/folders/1omtAyGPAOjDdx0H4lcjo33TijuGLfNjU?usp=drive_link'
            },
            {
                name: 'Music - 0410',
                notes: 'https://drive.google.com/drive/folders/1OAtxYQZpkpXfP6QPOlFzRMVhqyYlZZtH?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1mNIXvRmPMzTTNLtdaQJDTqk11hz_Yfxx?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1z-YlELhcxhy1FIDQINlc9Eg82j8USA4k?usp=drive_link'
            },
            {
                name: 'O-Level Setswana - 3158',
                notes:'https://drive.google.com/drive/folders/1ZWjU8T72bF_hZce0vcD797fHAFQjIgPt?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1m8F6n-Dp2M8amxqcYpQgtkL51g3qLBXh?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1PLbcJSd1YcSPejzqlBbSOBXM7UFrUAdv?usp=drive_link'
            },
            {
                name: 'Physics - 0625',
                notes: 'https://drive.google.com/drive/folders/1_cWJGh_WcbWBZeTtCToCh7FX1C7ZMO7c?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/18tswsx6iDdutpfUzXui34atShddQsjEg?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1Jct-fNvUZNVi8qk-slyUlPrIVoYkFOGF?usp=drive_link'
            },
            {
                name: 'Sciences - Co-ordinated (Double) - 0654',
                notes: 'https://drive.google.com/drive/folders/1oXlhWN246jGo3zvU2QkBAEpTWoawFg51?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1AwCMXdxAV04Tkagoh_iB0qKRcHkaYy6k?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/12WAIi3JJJgEX-7Cp5W9fZvTIUn7OwrOf?usp=drive_link'
            },
            {
                name: 'Travel and Tourism - 0471',
                notes: 'https://drive.google.com/drive/folders/1IFsRe9_rW_DRJZhwWsOLN77Pj5QO82Eo?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1I2E2J6CG-lrkATLJW4OgunMCvM7AjeTH?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/14Hu4AXHzpuQF2SZ_Ca9rkfVw0NP_Y1Go?usp=drive_link'
            }
        ],
       alevel: [
            {
                name: 'Accounting - 9706',
                notes: 'https://drive.google.com/drive/folders/1BQ7smtUAv2SqO1xCMwna0NxQxPEn6yaz?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1y__2uhTA3suKUwa53JUlAiPTn8hNl-_r?usp=drive_link',
                cs:'https://drive.google.com/drive/folders/1L_ms5C0sQM29hxI7jAIEFHc8tn1F4jSg?usp=drive_link'
            },
            {
                name: 'Biology - 9700',
                notes: 'https://drive.google.com/drive/folders/1oAy06ZfTfacDi8ha105yEADaxyvx1-P7?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1eslFcu2Z5ttNV6WJ1sdaTrYreJvAsuTa?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1La6fT-ZLpnJfP16j9IrQ6Kl6d-NJYQnE?usp=drive_link'
            },
            {
                name: 'Business Studies - 9609',
                notes: 'https://drive.google.com/drive/folders/1Qh671O5BXaZ3AhTp-hEwKW9VBCj8pbjD?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1vnfqABlCVUoHSFn1Y5K0DJJpfqzfghhu?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1LlIqJ4t5cMTk6tXfiFFoqKNAeEuqKW_P?usp=drive_link'
            },
            {
                name: 'Chemistry - 9701',
                notes: 'https://drive.google.com/drive/folders/1xQ__HY3ITbmz-FBUICNuIjzQtD5eMcm_?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1_F2j4-BMyLjkr30hyUQiZz3qLyWxsEo6?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1M1adM16jRJ-76-WyDy24sFy7kUIU7Wr9?usp=drive_link'
            },
            {
                name: 'Computer Science - 9618',
                notes: 'https://drive.google.com/drive/folders/1-CQvpTXNQfE0W3doEVkSg4t9gOSVac3r?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1PoMBQj_LVAh12J_U6PE0VJhYZ9kZ9Thh?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1M6EiZdzTNcRFd73AgxhGJoZ3gWi26QF_?usp=drive_link'
            },
            {
                name: 'Economics - 9708',
                notes: 'https://drive.google.com/drive/folders/1NOtKTg_R4nnIQc2_AO39PG_Agfy1FAUZ?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1GP-AbM9vKJDblD3cGNeP82lgs2c9rxj7?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1M9DLjWGrSkuzKbeXWeQ-2rtm60Wkkmtj?usp=drive_link'
            },
            {
                name: 'Geography - 9696',
                notes: 'https://drive.google.com/drive/folders/1cuIKuFdCZXiI77f0KxFEvWSv_j574kom?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1I6MRxLKT5IkA-JruP-y169SfQ6LM0W2_?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1MO1nmXuBDoiHBss5VrNbgXh6ukfvxnSx?usp=drive_link'
            },
            {
                name: 'History - 9489',
                notes: 'https://drive.google.com/drive/folders/1TsU-czuWmWUNJxGdTK130TFPHpT1q3Fi?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1E-ybEyLqQg9xR9_lSdhI4uhz_LgGAwQ3?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1MR2e3ExzSjINi9bhOFNEnxxY1I2yppWK?usp=drive_link'
            },
            {
                name: 'Information Technology - 9626',
                notes: 'https://drive.google.com/drive/folders/1lTpcJSwkzjk54b-DPohh_xMrUFWwExPM?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/16fL8WRT1wA7KnfhMZZ-T2N_zzoz-KmoI?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1M_VLv2Op4OE86CeXdcoUZcycdmWERLqu?usp=drive_link'
            },
            {
                name: 'Mathematics - Further - 9231',
                notes: 'https://drive.google.com/drive/folders/1D56ho2DUAMEljTSXu3sJ3lBEevpnO6DL?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1PJ9wqGMErSMKO2niT4r4Wf32ZwAAeTzA?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1MM7gRfeGjC7h5YyLTnKIzMQ8DaZnQ8q0?usp=drive_link'
            },
            {
                name: 'Mathematics - 9709',
                notes: 'https://drive.google.com/drive/folders/1ubmuJSmULfz8CZosnHRK6xqw33aR3YoI?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1pipS8bkg8uWjCj7h9RDzfy-Y1cNh7S4s?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1MagIUBIGX4GWZ1FVRkGydIxPULTCmqlH?usp=drive_link'
            },
            {
                name: 'Physics - 9702',
                notes: 'https://drive.google.com/drive/folders/1tADd6WPnNnUj1lFec0WHXVLRyznXm_nL?usp=drive_link',
                pastpaper: 'https://drive.google.com/drive/folders/1Oo7EnOoTy0IIRF39-Bg5Kw5RXOZES5Vi?usp=drive_link',
                cs: 'https://drive.google.com/drive/folders/1MkHZvQWiyXvu9ObJbeg6kFMWEDSX9lYw?usp=drive_link'
            }
    ],
       ib1: [
            {
                name: 'English A Language and Literature',
                notes: 'https://drive.google.com/drive/folders/1TCFylNBME1dETwyUssHq7jDMDf5dz1CV?usp=drive_link',
                hlnotes: 'https://drive.google.com/drive/folders/1FsvlplZ5uM3nY_mpZiP_9xu0MNkgJH7M?usp=drive_link',
                cs:'https://drive.google.com/drive/folders/15y_6NbgZsBeeVOpVWzvr5rTMIBWdKiGA?usp=drive_link'
            }
       ],
       ib2: [
           {
               name: 'French Ab Initio',
               notes: 'https://drive.google.com/drive/folders/1xPC9uScVhv1rXZMXjjY_QcAFPhUG06sa?usp=drive_link',
               cs: 'https://drive.google.com/drive/folders/1CGTI1y19_xqFvYw2zJyFF3fNsh-Wa7B5?usp=drive_link'
           },
           {
               name: 'French B',
               notes: 'https://drive.google.com/drive/folders/1MYwMxhgISObCfDDiupmMvGHm1S81AATu?usp=drive_link',
               hlnotes: 'https://drive.google.com/drive/folders/1pmBQWfwVqlauQOdZXOMLa5wXe6JhkDn9?usp=drive_link',
               cs: 'https://drive.google.com/drive/folders/1nG5Q2y_VzE_TekpFYYn50KXcjLh0z-53?usp=drive_link'
           },
           {
               name: 'Spanish Ab Initio',
               notes: 'https://drive.google.com/drive/folders/1knCm-yIxpoy7in6zKLGxtNN0vT0b7yMN?usp=drive_link',
               cs: 'https://drive.google.com/drive/folders/1CGTI1y19_xqFvYw2zJyFF3fNsh-Wa7B5?usp=drive_link'
           }
       ],
       ibhumanities: [
           {
               name: 'Business Management',
               notes: 'https://drive.google.com/drive/folders/1mq1XedBQD_TzeD9QK4HU2ze_2fKlYo6I?usp=drive_link',
               hlnotes: 'https://drive.google.com/drive/folders/1Ej7VixXW_4NB_kkhd5lP0041wooTI5NK?usp=drive_link',
               cs: 'https://drive.google.com/drive/folders/14cHBYvNXLgSdI3-bAFai1h7niaZj_uc9?usp=drive_link'
           },
           {
               name: 'Digital Societies',
               notes: 'https://drive.google.com/drive/folders/18QuhGiKGmxspxgNQpVujXCqyjEOhsNGJ?usp=drive_link',
               hlnotes: 'https://drive.google.com/drive/folders/1UlVVra3MTvEbnYDnHJ4tY8Wl4vL0alDh?usp=drive_link',
               cs: 'https://drive.google.com/drive/folders/1KcwoNNpQbvs7teu3exev-PHjv0QHnWY4?usp=drive_link'
           },
           {
               name: 'History',
               notes: 'https://drive.google.com/drive/folders/1zRq1q55TTlxYJl43ugaj9VVPXuk773sf?usp=drive_link',
               hlnotes: 'https://drive.google.com/drive/folders/1wuS5BtPBvYyd3sXE2rcqyyqwcJYsMIAf?usp=drive_link',
               cs: 'https://drive.google.com/drive/folders/1Hsvkdb-XDvi4UGjV-35LOZlCNi3HmtNP?usp=drive_link'
           },
           {
               name: 'Geography',
               notes: 'https://drive.google.com/drive/folders/1OO6jKHx50p0D_yka1GzDLggGAXY4rrhp?usp=drive_link',
               hlnotes: 'https://drive.google.com/drive/folders/17ljiuvRNZoypvG2PHDnCzt_c6ptiBHb5?usp=drive_link',
               cs: 'https://drive.google.com/drive/folders/1jML_zT79i7fzng87pH9WCPPiZv_ET7SV?usp=drive_link'
           }
       ],
       ibscience: [
           {
               name: 'Biology',
               notes: 'https://drive.google.com/drive/folders/1wdg3MNfh7myZSR3O22dxOgpac685wIJE?usp=drive_link',
               hlnotes: 'https://drive.google.com/drive/folders/1PBYxBiF2OrIqP8zwKI_xTsL6SEC0X_Zn?usp=drive_link',
               cs: 'https://drive.google.com/drive/folders/1wwP6GvXy-zcloiht7z39ouuub5uCJQli?usp=drive_link'
           },
           {
               name: 'Chemistry',
               notes: 'https://drive.google.com/drive/folders/1aHrx8Aa9ZJkvr52hwjTd2hfPVUw6fqgM?usp=drive_link',
               hlnotes: 'https://drive.google.com/drive/folders/1mA-lMjF4q7LrK8tBpuM8-4hg8IAtF-K9?usp=drive_link',
               cs: 'https://drive.google.com/drive/folders/14NSAyIbGk1Jb6WDQj9czRAmxUMpzXTsS?usp=drive_link'
           },
           {
               name: 'Physics',
               notes: 'https://drive.google.com/drive/folders/1LRuf3DJOE-Eh7NeBH4GDN4sdUZ-9Y6mR?usp=drive_link',
               hlnotes: 'https://drive.google.com/drive/folders/1dDJXIepoLII1LvqtFxAaRbuFcONgtSnO?usp=drive_link',
               cs: 'https://drive.google.com/drive/folders/1LRe_-8RyfyYZrWOstOTHHlZY1KKskFWd?usp=drive_link'
           },
           {
               name: 'Environmental Systems and Societies',
               notes: 'https://drive.google.com/drive/folders/1oES9LiP-b56aXK7rD1JUTgdbMlHgb0-j?usp=drive_link',
               hlnotes: 'https://drive.google.com/drive/folders/1_IRl145-YKT6YZpWBdXjwF6M6BPNraBv?usp=drive_link',
               cs: 'https://drive.google.com/drive/folders/13Ev4XNFHdcuwSsOxaLd2x4OmKlfRmRHu?usp=drive_link'
           }
       ],
       ibmath: [
           {
               name: 'Mathematics Applications and Interpretations',
               notes: 'https://drive.google.com/drive/folders/1qLZP6zbdaqHqVEjenaoPyo1e_thlSWXw?usp=drive_link',
               hlnotes: 'https://drive.google.com/drive/folders/188JeTykMQ6P3FGLYUuzx4oVLR6c3kxYN?usp=drive_link',
               cs: 'https://drive.google.com/drive/folders/1u_L4cFYtVOo33A_UXcNlsRkgK99ntm8F?usp=drive_link'
           },
           {
               name: 'Mathematics Analysis and Approaches',
               notes: 'https://drive.google.com/drive/folders/1NSVbJOaNLzQt1OZHmHVTW2df2toJw_xt?usp=drive_link',
               hlnotes: 'https://drive.google.com/drive/folders/1kVXaltSne_FrKAIY1hdARqaDqFzZMx3G?usp=drive_link',
               cs: 'https://drive.google.com/drive/folders/165JEzabzWGG-rA4PkuYTmHabH70SlK7a?usp=drive_link'
           }
       ],
       ibArts: [
           {
               name: 'Visual Arts',
               notes: 'https://drive.google.com/drive/folders/1cyqCrtXrW8-Vv6oOFFH7Sl-mI7JlSrSZ?usp=drive_link',
               hlnotes: 'https://drive.google.com/drive/folders/1yy0TUgMx48SRaVhOVV-N44bubrGdcseR?usp=drive_link',
               cs: 'https://drive.google.com/drive/folders/1zb03dBmSu6-Soob6LSsuozKxEJPt-WUU?usp=drive_link'
           }
       ],
       ibcore: [
           {
               name: 'Creativity,Activity,Service',
               notes: '',
               cs: 'https://drive.google.com/drive/folders/1xZgui7GkE468JXwe5SiFIT3EZPz9bZpR?usp=drive_link'
           },
           {
               name: 'Extended Essay',
               cs: 'https://drive.google.com/drive/folders/1scNTdvvXbqxcI11fF_Nys59MqXNiXoO3?usp=drive_link'
           },
           {
               name: 'Theory of Knowledge',
               essay: 'https://drive.google.com/drive/folders/16JgGLyA9q3ZrZURi1wnZTCJxX_ZcDfZK?usp=drive_link',
               exhib: 'https://drive.google.com/drive/folders/1VEtyAzlncfuzzgfc-dpl7mPdLyxHHa5w?usp=drive_link',
               cs: 'https://drive.google.com/drive/folders/1U5mQwzEjJlYxoW6SfbMoe11aUdMN_n2p?usp=drive_link'
           }
       ]
  };


  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-[#0b131c] text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b131c]/90 to-[#0b131c]/90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ 
              backgroundImage: `url('/images/subject.jpg')` 
          }}
        ></div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6 text-[#edb232]">
            Explore our Subjects
          </h1>
          <p className="text-xl text-[#ffffff] max-w-3xl mx-auto">
            Access comprehensive study materials, downloadable notes, and past papers for our offered programs
          </p>
        </div>
      </section>

      {/* Select Examination Board */}
      <section className="py-8 bg-white ">
        <div className="container mx-auto px">
          <div className="bg-gradient-to-r from-[#0b131c] to-[#325d8e] p-8 rounded-lg text-white justify-center ">
            <h2 className="text-4xl font-bold text-[#edb232] mb-4 flex gap-3 justify-center" style={{ fontFamily: 'Pacifico' }}>
               Select Your Examination Board
            </h2>
           <p className="text-xl text-[#a6a6a6] flex flex-col md:flex-row gap-3 justify-center">
              <a href="#igcse" className="hover:text-[#ffffff] transition-colors">Cambridge IGCSE</a>
              <a href="#alevel" className="hover:text-[#ffffff] transition-colors">Cambridge AS & A - Level</a>
              <a href="#ib" className="hover:text-[#ffffff] transition-colors">International Baccalaureate</a>
            </p>
           </div>
        </div>
      </section>
      {/* IGCSE Section */}
      <section id="igcse" className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#0b131c] mb-4 flex items-center justify-center gap-3">
                <i className="ri-book-line text-3xl text-[#ffffff] w-16 h-16 flex items-center justify-center bg-blue-500 rounded-full font-normal"></i>
                IGCSE Resources
              </h2>
              <p className="text-xl text-[#a6a6a6]">
                Complete study materials for International General Certificate of Secondary Education
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.igcse.map((subject, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow hover-lift"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-500 rounded-xl mb-4">
                    <i className="ri-book-line text-xl text-[#ffffff]"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0b131c] mb-2">{subject.name}</h3>

                  <div className="space-y-2">
                    <button
                    className="w-full bg-gradient-to-r from-[#0b131c] to-[#325d8e] text-white py-1 px-4 rounded-xl hover:from-[#325d8e] hover:to-[#0b131c] transition-all cursor-pointer whitespace-nowrap flex items-center justify-center"
                      onClick={() => window.open(subject.cs, '_blank')}
                    >
                      <i className="ri-file-text-line text-lg mr-2"></i>
                      Curriculum Resources
                    </button>

                    <button
                     className="w-full border border-[#edb232] text-[#edb232] py-1 px-4 rounded-xl hover:bg-[#0b131c] hover:text-[#edb232] transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center"
                      onClick={() => window.open(subject.notes, '_blank')}
                    >
                      <i className="ri-book-open-line text-lg mr-2"></i>
                      View Notes
                    </button>

                    <button
                      className="w-full bg-gradient-to-r from-[#0b131c] to-[#325d8e] text-white py-1 px-4 rounded-xl hover:from-[#325d8e] hover:to-[#0b131c] transition-all cursor-pointer whitespace-nowrap flex items-center justify-center"
                      onClick={() => window.open(subject.pastpaper, '_blank')}
                    >
                      <i className="ri-file-text-line text-lg mr-2"></i>
                      Past Papers
                    </button>

                    {subject.name === 'Geography - 0460' && (
                      <button
                        className="w-full border border-[#edb232] text-[#edb232] py-1 px-4 rounded-xl hover:bg-[#0b131c] hover:text-[#edb232] transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center"
                        onClick={() => window.open(subject.caseStudies, '_blank')}
                      >
                        <i className="ri-file-text-line text-lg mr-2"></i>
                        Case Studies
                      </button>
                    )}

                    {subject.name === 'Mathematics - 0580' && (
                      <button
                        className="w-full border border-[#edb232] text-[#edb232] py-1 px-4 rounded-xl hover:bg-[#0b131c] hover:text-[#edb232] transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center"
                        onClick={() => window.open(subject.topical, '_blank')}
                      >
                        <i className="ri-file-text-line text-lg mr-2"></i>
                        Topical Questions
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* A-Level Section */}
     <section id="alevel" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
           <h2 className="text-4xl font-bold text-[#0b131c] mb-4 flex items-center justify-center gap-3">
               <i className="ri-book-line text-3xl text-[#ffffff] w-16 h-16 flex items-center justify-center bg-green-500 rounded-full font-normal "></i>
               A-Level Resources
            </h2>
            <p className="text-xl text-[#a6a6a6]">
              Complete study materials for Advanced Level General Certificate of Education
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {subjects.alevel
                          .map((subject, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow hover-lift">
                <div className="w-10 h-10 flex items-center justify-center bg-green-500 rounded-xl mb-4">
                 <i className="ri-book-line text-xl text-[#ffffff]"></i>
                </div>
                <h3 className="text-lg font-semibold text-[#0b131c] mb-2">{subject.name}</h3>
                <div className="space-y-2">
                <button className="w-full bg-gradient-to-r from-[#0b131c] to-[#325d8e] text-white py-1 px-4 rounded-xl hover:from-[#325d8e] hover:to-[#0b131c] transition-all cursor-pointer whitespace-nowrap flex items-center justify-center"
                      onClick={() => window.open(subject.cs, '_blank')}                        >
                    <i className="ri-file-text-line text-lg mr-2"></i>
                    Curriculum Resources
                  </button>
                  <button
                  className="w-full border border-[#edb232] text-[#edb232] py-1 px-4 rounded-xl hover:bg-[#0b131c] hover:text-[#edb232] transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center"
                  onClick={() => window.open(subject.notes, '_blank')}
                >
                  <i className="ri-book-open-line text-lg mr-2"></i>
                  View Notes
                </button>
                  <button 
                  className="w-full bg-gradient-to-r from-[#0b131c] to-[#325d8e] text-white py-1 px-4 rounded-xl hover:from-[#325d8e] hover:to-[#0b131c] transition-all cursor-pointer whitespace-nowrap flex items-center justify-center"
                  onClick={() =>window.open(subject.pastpaper, '_blank')}>
                    <i className="ri-file-text-line text-lg mr-2"></i>
                    
                    Past Papers
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IB Section */}
     <section id="ib" className="py-8 bg-gray-50">
      <div className="container mx-auto ">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#0b131c] mb-4 flex items-center justify-center gap-3">
            <i className="ri-book-line text-3xl text-white w-16 h-16 flex items-center justify-center bg-purple-500 rounded-full font-normal"></i>
            IB Resources
          </h2>
          <p className="text-xl text-[#a6a6a6] mb-4">
            Complete study materials for International Baccalaureate Diploma Programme
          </p>
        </div>
        <div className="bg-gradient-to-r from-[#0b131c] to-[#325d8e] p-6 rounded-xl text-white mx-auto">
          <p className="text-xl text-[#a6a6a6] flex flex-col md:flex-row gap-3 justify-center">
              <a href="#g1" className="hover:text-[#edb232] transition-colors">Group 1 : Studies in languages and Literature </a>
              <a href="#g2" className="hover:text-[#edb232] transition-colors">Group 2 : Language acquisition</a>
              <a href="#g3" className="hover:text-[#edb232] transition-colors">Group 3 : Individuals and societies</a>
          </p>
          <p className="text-xl text-[#a6a6a6] flex flex-col md:flex-row gap-3 py-2 justify-center">
             <a href="#g4" className="hover:text-[#edb232] transition-colors">Group 4 : Sciences </a>
              <a href="#g5" className="hover:text-[#edb232] transition-colors">Group 5 : Mathematics</a>
              <a href="#g6" className="hover:text-[#edb232] transition-colors">Group 6 : Arts </a>
              <a href="#gcore" className="hover:text-[#edb232] transition-colors">Core Studies</a>
         </p>
        </div>
      </div>
      </section>

     <section className="py-8 bg-white-50" id="g1">
      <div className="container mx-auto px-6" >
           <h2 className="text-2xl font-bold font-pacifico text-[#0b131c] mb-4 flex items-center justify-center gap-3">
              Group 1 : Studies in languages and Literature 
            </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
          {subjects.ib1.map((subject, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow hover-lift">
              <div className="w-10 h-10 flex items-center justify-center bg-purple-500 rounded-xl mb-4">
                <i className="ri-book-line text-xl text-white"></i>
              </div>
              <h3 className="text-lg font-semibold text-[#0b131c] mb-2">{subject.name}</h3>
              <div className="space-y-2">
                {subject.cs && (
                  <button
                   className="w-full bg-gradient-to-r from-[#0b131c] to-[#325d8e] text-white py-1 px-4 rounded-xl hover:from-[#325d8e] hover:to-[#0b131c] transition-all cursor-pointer whitespace-nowrap flex items-center justify-center"
                    onClick={() => window.open(subject.cs, '_blank')}
                  >
                    <i className="ri-file-text-line text-lg mr-2"></i>
                    Curriculum Resources
                  </button>
                )}

                {subject.notes && (
                  <button
                              className="w-full border border-[#edb232] text-[#edb232] py-1 px-4 rounded-xl hover:bg-[#0b131c] hover:text-[#edb232] transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center"                    onClick={() => window.open(subject.notes, '_blank')}
                  >
                    <i className="ri-book-open-line text-lg mr-2"></i>
                    View Standard Level Notes
                  </button>
                )}

                {subject.hlnotes && (
                  <button
                    className="w-full bg-gradient-to-r from-[#0b131c] to-[#325d8e] text-white py-1 px-4 rounded-xl hover:from-[#325d8e] hover:to-[#0b131c] transition-all cursor-pointer whitespace-nowrap flex items-center justify-center"
                    onClick={() => window.open(subject.hlnotes, '_blank')}
                  >
                    <i className="ri-book-open-line text-lg mr-2"></i>
                    View Higher Level Notes
                  </button>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
     
     <section className="py-8 bg-gray-50" id="g2">
      <div className="container mx-auto px-6" >
      <h2 className="text-2xl font-bold font-pacifico text-[#0b131c] mb-4 flex items-center justify-center gap-3">
            Group 2 : Language acquisition
          </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
          {subjects.ib2.map((subject, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow hover-lift">
              <div className="w-10 h-10 flex items-center justify-center bg-purple-500 rounded-xl mb-4">
                <i className="ri-book-line text-xl text-white"></i>
              </div>
              <h3 className="text-lg font-semibold text-[#0b131c] mb-2">{subject.name}</h3>
              <div className="space-y-2">
                {subject.cs && (
                  <button
                   className="w-full bg-gradient-to-r from-[#0b131c] to-[#325d8e] text-white py-1 px-4 rounded-xl hover:from-[#325d8e] hover:to-[#0b131c] transition-all cursor-pointer whitespace-nowrap flex items-center justify-center"
                    onClick={() => window.open(subject.cs, '_blank')}
                  >
                    <i className="ri-file-text-line text-lg mr-2"></i>
                    Curriculum Resources
                  </button>
                )}

                {subject.notes && (
                  <button
                              className="w-full border border-[#edb232] text-[#edb232] py-1 px-4 rounded-xl hover:bg-[#0b131c] hover:text-[#edb232] transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center"                    onClick={() => window.open(subject.notes, '_blank')}
                  >
                    <i className="ri-book-open-line text-lg mr-2"></i>
                    View Standard Level Notes
                  </button>
                )}

                {subject.hlnotes && (
                  <button
                    className="w-full bg-gradient-to-r from-[#0b131c] to-[#325d8e] text-white py-1 px-4 rounded-xl hover:from-[#325d8e] hover:to-[#0b131c] transition-all cursor-pointer whitespace-nowrap flex items-center justify-center"
                    onClick={() => window.open(subject.hlnotes, '_blank')}
                  >
                    <i className="ri-book-open-line text-lg mr-2"></i>
                    View Higher Level Notes
                  </button>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
          </section>

     <section className="py-8 bg-white-50" id="g3">
      <div className="container mx-auto px-6" >
      <h2 className="text-2xl font-bold font-pacifico text-[#0b131c] mb-4 flex items-center justify-center gap-3">
      Group 3 : Individuals and societies
    </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
          {subjects.ibhumanities.map((subject, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow hover-lift">
              <div className="w-10 h-10 flex items-center justify-center bg-purple-500 rounded-xl mb-4">
                <i className="ri-book-line text-xl text-white"></i>
              </div>
              <h3 className="text-lg font-semibold text-[#0b131c] mb-2">{subject.name}</h3>
              <div className="space-y-2">
                {subject.cs && (
                  <button
                   className="w-full bg-gradient-to-r from-[#0b131c] to-[#325d8e] text-white py-1 px-4 rounded-xl hover:from-[#325d8e] hover:to-[#0b131c] transition-all cursor-pointer whitespace-nowrap flex items-center justify-center"
                    onClick={() => window.open(subject.cs, '_blank')}
                  >
                    <i className="ri-file-text-line text-lg mr-2"></i>
                    Curriculum Resources
                  </button>
                )}

                {subject.notes && (
                  <button
                              className="w-full border border-[#edb232] text-[#edb232] py-1 px-4 rounded-xl hover:bg-[#0b131c] hover:text-[#edb232] transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center"                    onClick={() => window.open(subject.notes, '_blank')}
                  >
                    <i className="ri-book-open-line text-lg mr-2"></i>
                    View Standard Level Notes
                  </button>
                )}

                {subject.hlnotes && (
                  <button
                    className="w-full bg-gradient-to-r from-[#0b131c] to-[#325d8e] text-white py-1 px-4 rounded-xl hover:from-[#325d8e] hover:to-[#0b131c] transition-all cursor-pointer whitespace-nowrap flex items-center justify-center"
                    onClick={() => window.open(subject.hlnotes, '_blank')}
                  >
                    <i className="ri-book-open-line text-lg mr-2"></i>
                    View Higher Level Notes
                  </button>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
          </section>

     <section className="py-8 bg-gray-50" id="g4">
      <div className="container mx-auto px-6">
      <h2 className="text-2xl font-bold font-pacifico text-[#0b131c] mb-4 flex items-center justify-center gap-3">
      Group 4 : Sciences 
    </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
          {subjects.ibscience.map((subject, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow hover-lift">
              <div className="w-10 h-10 flex items-center justify-center bg-purple-500 rounded-xl mb-4">
                <i className="ri-book-line text-xl text-white"></i>
              </div>
              <h3 className="text-lg font-semibold text-[#0b131c] mb-2">{subject.name}</h3>
              <div className="space-y-2">
                {subject.cs && (
                  <button
                   className="w-full bg-gradient-to-r from-[#0b131c] to-[#325d8e] text-white py-1 px-4 rounded-xl hover:from-[#325d8e] hover:to-[#0b131c] transition-all cursor-pointer whitespace-nowrap flex items-center justify-center"
                    onClick={() => window.open(subject.cs, '_blank')}
                  >
                    <i className="ri-file-text-line text-lg mr-2"></i>
                    Curriculum Resources
                  </button>
                )}

                {subject.notes && (
                  <button
                              className="w-full border border-[#edb232] text-[#edb232] py-1 px-4 rounded-xl hover:bg-[#0b131c] hover:text-[#edb232] transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center"                    onClick={() => window.open(subject.notes, '_blank')}
                  >
                    <i className="ri-book-open-line text-lg mr-2"></i>
                    View Standard Level Notes
                  </button>
                )}

                {subject.hlnotes && (
                  <button
                    className="w-full bg-gradient-to-r from-[#0b131c] to-[#325d8e] text-white py-1 px-4 rounded-xl hover:from-[#325d8e] hover:to-[#0b131c] transition-all cursor-pointer whitespace-nowrap flex items-center justify-center"
                    onClick={() => window.open(subject.hlnotes, '_blank')}
                  >
                    <i className="ri-book-open-line text-lg mr-2"></i>
                    View Higher Level Notes
                  </button>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
          </section>

     <section className="py-8 bg-white-50" id="g5">
      <div className="container mx-auto px-6">
      <h2 className="text-2xl font-bold font-pacifico text-[#0b131c] mb-4 flex items-center justify-center gap-3">
      Group 5 : Mathematics
    </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
          {subjects.ibmath.map((subject, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow hover-lift">
              <div className="w-10 h-10 flex items-center justify-center bg-purple-500 rounded-xl mb-4">
                <i className="ri-book-line text-xl text-white"></i>
              </div>
              <h3 className="text-lg font-semibold text-[#0b131c] mb-2">{subject.name}</h3>
             <div className="space-y-2">
                {subject.cs && (
                  <button
                   className="w-full bg-gradient-to-r from-[#0b131c] to-[#325d8e] text-white py-1 px-4 rounded-xl hover:from-[#325d8e] hover:to-[#0b131c] transition-all cursor-pointer whitespace-nowrap flex items-center justify-center"
                    onClick={() => window.open(subject.cs, '_blank')}
                  >
                    <i className="ri-file-text-line text-lg mr-2"></i>
                    Curriculum Resources
                  </button>
                )}

                {subject.notes && (
                  <button
                              className="w-full border border-[#edb232] text-[#edb232] py-1 px-4 rounded-xl hover:bg-[#0b131c] hover:text-[#edb232] transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center"                    onClick={() => window.open(subject.notes, '_blank')}
                  >
                    <i className="ri-book-open-line text-lg mr-2"></i>
                    View Standard Level Notes
                  </button>
                )}

                {subject.hlnotes && (
                  <button
                    className="w-full bg-gradient-to-r from-[#0b131c] to-[#325d8e] text-white py-1 px-4 rounded-xl hover:from-[#325d8e] hover:to-[#0b131c] transition-all cursor-pointer whitespace-nowrap flex items-center justify-center"
                    onClick={() => window.open(subject.hlnotes, '_blank')}
                  >
                    <i className="ri-book-open-line text-lg mr-2"></i>
                    View Higher Level Notes
                  </button>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
          </section>

     <section className="py-8 bg-gray-50"id="g6">
      <div className="container mx-auto px-6">
      <h2 className="text-2xl font-bold font-pacifico text-[#0b131c] mb-4 flex items-center justify-center gap-3">
      Group 6 : Arts
    </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
          {subjects.ibArts.map((subject, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow hover-lift">
              <div className="w-10 h-10 flex items-center justify-center bg-purple-500 rounded-xl mb-4">
                <i className="ri-book-line text-xl text-white"></i>
              </div>
              <h3 className="text-lg font-semibold text-[#0b131c] mb-2">{subject.name}</h3>
              <div className="space-y-2">
                {subject.cs && (
                  <button
                   className="w-full bg-gradient-to-r from-[#0b131c] to-[#325d8e] text-white py-1 px-4 rounded-xl hover:from-[#325d8e] hover:to-[#0b131c] transition-all cursor-pointer whitespace-nowrap flex items-center justify-center"
                    onClick={() => window.open(subject.cs, '_blank')}
                  >
                    <i className="ri-file-text-line text-lg mr-2"></i>
                    Curriculum Resources
                  </button>
                )}

                {subject.notes && (
                  <button
                              className="w-full border border-[#edb232] text-[#edb232] py-1 px-4 rounded-xl hover:bg-[#0b131c] hover:text-[#edb232] transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center"                    onClick={() => window.open(subject.notes, '_blank')}
                  >
                    <i className="ri-book-open-line text-lg mr-2"></i>
                    View Standard Level Notes
                  </button>
                )}

                {subject.hlnotes && (
                  <button
                    className="w-full bg-gradient-to-r from-[#0b131c] to-[#325d8e] text-white py-1 px-4 rounded-xl hover:from-[#325d8e] hover:to-[#0b131c] transition-all cursor-pointer whitespace-nowrap flex items-center justify-center"
                    onClick={() => window.open(subject.hlnotes, '_blank')}
                  >
                    <i className="ri-book-open-line text-lg mr-2"></i>
                    View Higher Level Notes
                  </button>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
          </section>

     <section className="py-8 bg-white-50" id="gcore">
      <div className="container mx-auto px">
      <h2 className="text-2xl font-bold font-pacifico text-[#0b131c] mb-4 flex items-center justify-center ">
      Core Studies
    </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
          {subjects.ibcore.map((subject, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow hover-lift">
              <div className="w-10 h-10 flex items-center justify-center bg-purple-500 rounded-xl mb-4">
                <i className="ri-book-line text-xl text-white"></i>
              </div>
              <h3 className="text-lg font-semibold text-[#0b131c] mb-2">{subject.name}</h3>
              <div className="space-y-2">
                {subject.cs && (
                  <button
                   className="w-full bg-gradient-to-r from-[#0b131c] to-[#325d8e] text-white py-1 px-4 rounded-xl hover:from-[#325d8e] hover:to-[#0b131c] transition-all cursor-pointer whitespace-nowrap flex items-center justify-center"
                    onClick={() => window.open(subject.cs, '_blank')}
                  >
                    <i className="ri-file-text-line text-lg mr-2"></i>
                    Curriculum Resources
                  </button>
                )}

                {/* Special handling for TOK essay */}
                {subject.essay && (
                  <button
                    className="w-full border border-[#edb232] text-[#edb232] py-1 px-4 rounded-xl hover:bg-[#0b131c] hover:text-[#edb232] transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center"         
                    onClick={() => window.open(subject.essay, '_blank')}
                  >
                    <i className="ri-file-paper-line text-lg mr-2"></i>
                    TOK Essay Samples
                  </button>
                )}

                {/* Special handling for TOK exhibition */}
                {subject.exhib && (
                  <button
                    className="w-full bg-gradient-to-r from-[#0b131c] to-[#325d8e] text-white py-1 px-4 rounded-xl hover:from-[#325d8e] hover:to-[#0b131c] transition-all cursor-pointer whitespace-nowrap flex items-center justify-center"
                    onClick={() => window.open(subject.exhib, '_blank')}
                  >
                    <i className="ri-gallery-line text-lg mr-2"></i>
                    TOK Exhibition Samples
                  </button>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0b131c] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#edb232]">Need Help Choosing?</h2>
          <p className="text-xl mb-8 text-[#a6a6a6] max-w-2xl mx-auto">
            Our academic advisors are here to help you select the right resources for your study goals. Get personalized recommendations today.
          </p>
          <Link href="/contact" className="bg-[#edb232] text-[#0b131c] px-8 py-3 rounded-lg font-semibold hover:bg-[#d4a02c] transition-colors cursor-pointer whitespace-nowrap">
            Get Academic Advice
          </Link>
        </div>
          </section>

          {isVisible && (
              <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="fixed bottom-6 right-6 z-50 bg-[#edb232] text-white p-3 rounded-full shadow-lg hover:bg-[#d4a02c] transition-all"
                  aria-label="Back to top"
              >
                  <RiArrowUpSLine className="text-2xl" />
              </button>
          )}

      <Footer />
    </div>
  );
}