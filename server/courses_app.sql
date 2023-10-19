--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cart" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Cart" OWNER TO postgres;

--
-- Name: CartItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CartItem" (
    id integer NOT NULL,
    "courseId" integer NOT NULL,
    quantity integer NOT NULL,
    "cartId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "coursePrice" double precision NOT NULL
);


ALTER TABLE public."CartItem" OWNER TO postgres;

--
-- Name: CartItem_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CartItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."CartItem_id_seq" OWNER TO postgres;

--
-- Name: CartItem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CartItem_id_seq" OWNED BY public."CartItem".id;


--
-- Name: Cart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Cart_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Cart_id_seq" OWNER TO postgres;

--
-- Name: Cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Cart_id_seq" OWNED BY public."Cart".id;


--
-- Name: Course; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Course" (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    image text NOT NULL,
    price double precision NOT NULL,
    selected boolean NOT NULL,
    "instructorId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Course" OWNER TO postgres;

--
-- Name: Course_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Course_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Course_id_seq" OWNER TO postgres;

--
-- Name: Course_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Course_id_seq" OWNED BY public."Course".id;


--
-- Name: Post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Post" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    title character varying(255) NOT NULL,
    content text,
    published boolean DEFAULT false NOT NULL,
    "authorId" integer NOT NULL
);


ALTER TABLE public."Post" OWNER TO postgres;

--
-- Name: Post_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Post_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Post_id_seq" OWNER TO postgres;

--
-- Name: Post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Post_id_seq" OWNED BY public."Post".id;


--
-- Name: Profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Profile" (
    id integer NOT NULL,
    bio text,
    "userId" integer NOT NULL
);


ALTER TABLE public."Profile" OWNER TO postgres;

--
-- Name: Profile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Profile_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Profile_id_seq" OWNER TO postgres;

--
-- Name: Profile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Profile_id_seq" OWNED BY public."Profile".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    name text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: UserCourse; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserCourse" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "courseId" integer NOT NULL,
    price double precision NOT NULL,
    "purchaseDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."UserCourse" OWNER TO postgres;

--
-- Name: UserCourse_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."UserCourse_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserCourse_id_seq" OWNER TO postgres;

--
-- Name: UserCourse_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."UserCourse_id_seq" OWNED BY public."UserCourse".id;


--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Cart id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart" ALTER COLUMN id SET DEFAULT nextval('public."Cart_id_seq"'::regclass);


--
-- Name: CartItem id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CartItem" ALTER COLUMN id SET DEFAULT nextval('public."CartItem_id_seq"'::regclass);


--
-- Name: Course id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Course" ALTER COLUMN id SET DEFAULT nextval('public."Course_id_seq"'::regclass);


--
-- Name: Post id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Post" ALTER COLUMN id SET DEFAULT nextval('public."Post_id_seq"'::regclass);


--
-- Name: Profile id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Profile" ALTER COLUMN id SET DEFAULT nextval('public."Profile_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: UserCourse id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserCourse" ALTER COLUMN id SET DEFAULT nextval('public."UserCourse_id_seq"'::regclass);


--
-- Data for Name: Cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Cart" (id, "userId", "createdAt") FROM stdin;
4	2	2023-10-16 11:56:37.497
2	1	2023-10-16 11:31:19.292
\.


--
-- Data for Name: CartItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CartItem" (id, "courseId", quantity, "cartId", "createdAt", "coursePrice") FROM stdin;
\.


--
-- Data for Name: Course; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Course" (id, title, description, image, price, selected, "instructorId", "createdAt") FROM stdin;
3	Wordpress pour les débutants	Si vous êtes nouveau dans le monde de la création de sites web ou si vous cherchez une solution conviviale pour lancer votre propre blog ou site web, WordPress est l'outil idéal pour vous. "WordPress pour les Débutants" est un guide complet conçu pour vous accompagner pas à pas dans le processus d'apprentissage et de maîtrise de WordPress, le système de gestion de contenu (CMS) le plus populaire au monde.	https://cdn.pixabay.com/photo/2016/11/13/04/52/statistic-1820320_640.png	29.49	f	1	2023-10-16 10:55:58.981
5	Python pour les débutant	Si vous avez toujours voulu découvrir le monde fascinant de la programmation informatique, "Python pour les Débutants" est le point de départ idéal. Ce guide complet est conçu pour ceux qui n'ont aucune expérience en programmation, et il vous emmène dans un voyage d'apprentissage captivant de Python, l'un des langages de programmation les plus conviviaux et puissants.	https://cdn.pixabay.com/photo/2014/10/10/08/01/letters-483010_640.jpg	140.99	f	3	2023-10-16 10:59:13.428
2	Coder facebook avec React JS	Explorez le développement web en créant une application web à l'image de Facebook en utilisant la puissance de React JS. Plongez dans la création de composants interactifs, la gestion de l'état de l'application, l'intégration d'authentification utilisateur, la mise en place de flux d'actualités, et bien d'autres fonctionnalités pour concevoir une expérience utilisateur captivante et réaliste, tout en renforçant vos compétences en développement front-end.	https://cdn.pixabay.com/photo/2018/06/19/17/50/facebook-icon-3484915_640.jpg	49.99	f	1	2023-10-15 12:14:56.113
1	Formation JavaScript Moderne	Une formation complète pour maîtriser les principes et les dernières avancées du JavaScript moderne. Explorez des concepts tels que les fonctions fléchées, les promesses, l'asynchrone, les classes, et bien plus encore. Que vous soyez débutant ou expérimenté, cette formation vous permettra de devenir un développeur JavaScript compétent et de créer des applications web dynamiques et interactives.	https://cdn.pixabay.com/photo/2019/07/16/18/18/frontend-4342425_640.png	99.99	t	2	2023-10-15 11:09:34.387
4	Maîtiser le logiciel Confluence	Ce guide condensé vous offre une opportunité inestimable de maîtriser Confluence, le logiciel de gestion de contenu et de collaboration d'entreprise. Que vous soyez un professionnel cherchant à optimiser la productivité de votre équipe ou un novice souhaitant découvrir les fonctionnalités de Confluence, ce guide vous accompagnera à chaque étape.	https://cdn.pixabay.com/photo/2016/08/17/04/39/template-1599663_640.png	39.99	f	2	2023-10-16 10:57:48.228
\.


--
-- Data for Name: Post; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Post" (id, "createdAt", "updatedAt", title, content, published, "authorId") FROM stdin;
1	2023-10-14 18:16:56.617	2023-10-14 18:24:00.534	Hello World	\N	t	1
\.


--
-- Data for Name: Profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Profile" (id, bio, "userId") FROM stdin;
1	I like Beer	1
2	i like Dogs	2
3	Im a dog	3
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, name, "createdAt") FROM stdin;
2	hermine@gmail.com	Hermine	2023-10-15 11:09:34.387
3	poupilou@gmail.com	Poupilou	2023-10-15 09:57:12.728
1	benjamin@ligny.pro	Benjamin	2023-10-15 11:09:34.387
\.


--
-- Data for Name: UserCourse; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserCourse" (id, "userId", "courseId", price, "purchaseDate") FROM stdin;
24	1	4	399.99	2023-10-18 12:39:49.001
30	1	1	99.99	2023-10-19 09:24:28.481
31	1	4	39.99	2023-10-19 09:24:28.481
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
e1d9263f-99ef-4614-b40e-e5d94f0fea1b	3de9e0465a22932a5a941f8f9a96591ac8be6d3e3bcbd66871fde9b0902d33c0	2023-10-14 20:10:40.96623+02	20231014181040_init	\N	\N	2023-10-14 20:10:40.940791+02	1
f204d3ef-f2dc-497a-9b36-520c6a733a9a	d4a5105b1ab926c0e070c6759169dcc5037ce05d9d69754741645c79aaa59847	2023-10-14 20:46:41.661499+02	20231014184641_add_courses	\N	\N	2023-10-14 20:46:41.653834+02	1
1bd20705-0f2e-4e3b-b848-fb795303ae34	6256d1e75fb2e76b621178d6a527a22f4c22951f2069123552608057d49a4675	2023-10-15 10:59:51.778093+02	20231015085951_add_user_courses_table	\N	\N	2023-10-15 10:59:51.768435+02	1
292dddfa-e108-46a9-baa8-1d742c706ad5	0c1884dec9f7dcdbe1d347d486b15f61a38e468392d1093387e68ade1ed9cb55	2023-10-15 11:09:34.394235+02	20231015090934_add_date_time_user_course_courses_user	\N	\N	2023-10-15 11:09:34.385706+02	1
e3e94852-1d94-4e20-9943-52029f3784c0	ef11e7cd5289a2bdd3d16357bdd82b021de29746405475b9816d3a2e3aee92a2	2023-10-15 14:01:50.430304+02	20231015120150_add_cart	\N	\N	2023-10-15 14:01:50.421287+02	1
93bc7869-c188-4da4-8eed-1ac59a6b783a	49171e58b54e01c3d183aeb556f9991e009e8846b5bb60f2bc5fd6006c297ba7	2023-10-15 15:14:27.116983+02	20231015131427_add_car_item_price	\N	\N	2023-10-15 15:14:27.114088+02	1
\.


--
-- Name: CartItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CartItem_id_seq"', 144, true);


--
-- Name: Cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Cart_id_seq"', 7, true);


--
-- Name: Course_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Course_id_seq"', 5, true);


--
-- Name: Post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Post_id_seq"', 1, true);


--
-- Name: Profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Profile_id_seq"', 3, true);


--
-- Name: UserCourse_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."UserCourse_id_seq"', 32, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 3, true);


--
-- Name: CartItem CartItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_pkey" PRIMARY KEY (id);


--
-- Name: Cart Cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_pkey" PRIMARY KEY (id);


--
-- Name: Course Course_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_pkey" PRIMARY KEY (id);


--
-- Name: Post Post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY (id);


--
-- Name: Profile Profile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_pkey" PRIMARY KEY (id);


--
-- Name: UserCourse UserCourse_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserCourse"
    ADD CONSTRAINT "UserCourse_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Cart_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Cart_userId_key" ON public."Cart" USING btree ("userId");


--
-- Name: Profile_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Profile_userId_key" ON public."Profile" USING btree ("userId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: CartItem CartItem_cartId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES public."Cart"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CartItem CartItem_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Cart Cart_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Course Course_instructorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Post Post_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Profile Profile_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserCourse UserCourse_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserCourse"
    ADD CONSTRAINT "UserCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserCourse UserCourse_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserCourse"
    ADD CONSTRAINT "UserCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

