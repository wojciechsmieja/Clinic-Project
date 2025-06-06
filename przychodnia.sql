PGDMP  6                    }           przychodnia    17.4    17.4 9               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    16388    przychodnia    DATABASE     q   CREATE DATABASE przychodnia WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'pl-PL';
    DROP DATABASE przychodnia;
                     postgres    false            �            1259    16453    badanie_fiz    TABLE     �   CREATE TABLE public.badanie_fiz (
    id_bad_fiz integer NOT NULL,
    wynik text NOT NULL,
    id_wiz integer NOT NULL,
    kod character varying(16) NOT NULL
);
    DROP TABLE public.badanie_fiz;
       public         heap r       postgres    false            �            1259    16460    badanie_lab    TABLE     V  CREATE TABLE public.badanie_lab (
    id_bad_lab integer NOT NULL,
    data_zlec date NOT NULL,
    status character varying(32) NOT NULL,
    data_wyk_anul date,
    wynik text,
    uwagi_lek text,
    data_zatw_anul date,
    uwagi_kier text,
    id_lab integer,
    id_klab integer,
    sl_bad character varying(16),
    id_wiz integer
);
    DROP TABLE public.badanie_lab;
       public         heap r       postgres    false            �            1259    24695    harmonogram_pracy    TABLE     �   CREATE TABLE public.harmonogram_pracy (
    id_har integer NOT NULL,
    dzien character varying(16) NOT NULL,
    godziny_od time without time zone NOT NULL,
    godziny_do time without time zone NOT NULL,
    id_lek integer NOT NULL
);
 %   DROP TABLE public.harmonogram_pracy;
       public         heap r       postgres    false            �            1259    16439    kierownik_lab    TABLE     �   CREATE TABLE public.kierownik_lab (
    id_klab integer NOT NULL,
    imie character varying(32) NOT NULL,
    nazwisko character varying(32) NOT NULL,
    id_prac integer NOT NULL
);
 !   DROP TABLE public.kierownik_lab;
       public         heap r       postgres    false            �            1259    16432    laborant    TABLE     �   CREATE TABLE public.laborant (
    id_lab integer NOT NULL,
    imie character varying(32) NOT NULL,
    nazwisko character varying(32) NOT NULL,
    id_prac integer NOT NULL
);
    DROP TABLE public.laborant;
       public         heap r       postgres    false            �            1259    16403    lekarz    TABLE     �   CREATE TABLE public.lekarz (
    id_lek integer NOT NULL,
    imie character varying(32) NOT NULL,
    nazwisko character varying(32) NOT NULL,
    npwz character varying(7) NOT NULL,
    id_prac integer NOT NULL
);
    DROP TABLE public.lekarz;
       public         heap r       postgres    false            �            1259    41063    pacjent_id_seq    SEQUENCE     w   CREATE SEQUENCE public.pacjent_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.pacjent_id_seq;
       public               postgres    false            �            1259    16389    pacjent    TABLE     ,  CREATE TABLE public.pacjent (
    id_pac integer DEFAULT nextval('public.pacjent_id_seq'::regclass) NOT NULL,
    imie character varying(32) NOT NULL,
    pesel character varying(11) NOT NULL,
    nazwisko character varying(32) NOT NULL,
    data_ur date NOT NULL,
    email character varying(32)
);
    DROP TABLE public.pacjent;
       public         heap r       postgres    false    228            �            1259    24698 
   pracownicy    TABLE     y  CREATE TABLE public.pracownicy (
    id_prac integer NOT NULL,
    username character varying(32) NOT NULL,
    password character varying(255) NOT NULL,
    pesel character varying(11) NOT NULL,
    data_ur date NOT NULL,
    status character varying(16) NOT NULL,
    id_lek integer,
    id_rej integer,
    id_lab integer,
    id_klab integer,
    admin boolean NOT NULL
);
    DROP TABLE public.pracownicy;
       public         heap r       postgres    false            �            1259    16396    rejestrator    TABLE     �   CREATE TABLE public.rejestrator (
    id_rej integer NOT NULL,
    imie character varying(32) NOT NULL,
    nazwisko character varying(32) NOT NULL,
    id_prac integer NOT NULL
);
    DROP TABLE public.rejestrator;
       public         heap r       postgres    false            �            1259    16446    slownik_bad    TABLE     �   CREATE TABLE public.slownik_bad (
    kod character varying(16) NOT NULL,
    typ character varying(1) NOT NULL,
    nazwa text NOT NULL
);
    DROP TABLE public.slownik_bad;
       public         heap r       postgres    false            �            1259    16410    wizyta    TABLE     o  CREATE TABLE public.wizyta (
    id_wiz integer NOT NULL,
    opis text NOT NULL,
    diagnoza text,
    status character varying(32) NOT NULL,
    data_wiz timestamp without time zone NOT NULL,
    czas_trwania interval NOT NULL,
    id_pac integer NOT NULL,
    id_rej integer NOT NULL,
    id_lek integer NOT NULL,
    czas_zak_anul timestamp without time zone
);
    DROP TABLE public.wizyta;
       public         heap r       postgres    false            
          0    16453    badanie_fiz 
   TABLE DATA           E   COPY public.badanie_fiz (id_bad_fiz, wynik, id_wiz, kod) FROM stdin;
    public               postgres    false    224   I                 0    16460    badanie_lab 
   TABLE DATA           �   COPY public.badanie_lab (id_bad_lab, data_zlec, status, data_wyk_anul, wynik, uwagi_lek, data_zatw_anul, uwagi_kier, id_lab, id_klab, sl_bad, id_wiz) FROM stdin;
    public               postgres    false    225   "I                 0    24695    harmonogram_pracy 
   TABLE DATA           Z   COPY public.harmonogram_pracy (id_har, dzien, godziny_od, godziny_do, id_lek) FROM stdin;
    public               postgres    false    226   ?I                 0    16439    kierownik_lab 
   TABLE DATA           I   COPY public.kierownik_lab (id_klab, imie, nazwisko, id_prac) FROM stdin;
    public               postgres    false    222   \I                 0    16432    laborant 
   TABLE DATA           C   COPY public.laborant (id_lab, imie, nazwisko, id_prac) FROM stdin;
    public               postgres    false    221   yI                 0    16403    lekarz 
   TABLE DATA           G   COPY public.lekarz (id_lek, imie, nazwisko, npwz, id_prac) FROM stdin;
    public               postgres    false    219   �I                 0    16389    pacjent 
   TABLE DATA           P   COPY public.pacjent (id_pac, imie, pesel, nazwisko, data_ur, email) FROM stdin;
    public               postgres    false    217   �I                 0    24698 
   pracownicy 
   TABLE DATA           �   COPY public.pracownicy (id_prac, username, password, pesel, data_ur, status, id_lek, id_rej, id_lab, id_klab, admin) FROM stdin;
    public               postgres    false    227   #J                 0    16396    rejestrator 
   TABLE DATA           F   COPY public.rejestrator (id_rej, imie, nazwisko, id_prac) FROM stdin;
    public               postgres    false    218   @J       	          0    16446    slownik_bad 
   TABLE DATA           6   COPY public.slownik_bad (kod, typ, nazwa) FROM stdin;
    public               postgres    false    223   ]J                 0    16410    wizyta 
   TABLE DATA              COPY public.wizyta (id_wiz, opis, diagnoza, status, data_wiz, czas_trwania, id_pac, id_rej, id_lek, czas_zak_anul) FROM stdin;
    public               postgres    false    220   zJ                  0    0    pacjent_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.pacjent_id_seq', 2, true);
          public               postgres    false    228            Y           2606    16459    badanie_fiz badanie_fiz_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.badanie_fiz
    ADD CONSTRAINT badanie_fiz_pkey PRIMARY KEY (id_bad_fiz);
 F   ALTER TABLE ONLY public.badanie_fiz DROP CONSTRAINT badanie_fiz_pkey;
       public                 postgres    false    224            [           2606    16466    badanie_lab badanie_lab_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.badanie_lab
    ADD CONSTRAINT badanie_lab_pkey PRIMARY KEY (id_bad_lab);
 F   ALTER TABLE ONLY public.badanie_lab DROP CONSTRAINT badanie_lab_pkey;
       public                 postgres    false    225            U           2606    16445    kierownik_lab klab_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.kierownik_lab
    ADD CONSTRAINT klab_pkey PRIMARY KEY (id_klab);
 A   ALTER TABLE ONLY public.kierownik_lab DROP CONSTRAINT klab_pkey;
       public                 postgres    false    222            S           2606    16438    laborant lab_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.laborant
    ADD CONSTRAINT lab_pkey PRIMARY KEY (id_lab);
 ;   ALTER TABLE ONLY public.laborant DROP CONSTRAINT lab_pkey;
       public                 postgres    false    221            O           2606    16409    lekarz lekarz_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.lekarz
    ADD CONSTRAINT lekarz_pkey PRIMARY KEY (id_lek);
 <   ALTER TABLE ONLY public.lekarz DROP CONSTRAINT lekarz_pkey;
       public                 postgres    false    219            K           2606    16395    pacjent pacjent_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.pacjent
    ADD CONSTRAINT pacjent_pkey PRIMARY KEY (id_pac);
 >   ALTER TABLE ONLY public.pacjent DROP CONSTRAINT pacjent_pkey;
       public                 postgres    false    217            ]           2606    24722    pracownicy pracownicy_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.pracownicy
    ADD CONSTRAINT pracownicy_pkey PRIMARY KEY (id_prac);
 D   ALTER TABLE ONLY public.pracownicy DROP CONSTRAINT pracownicy_pkey;
       public                 postgres    false    227            M           2606    16402    rejestrator rejestrator_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.rejestrator
    ADD CONSTRAINT rejestrator_pkey PRIMARY KEY (id_rej);
 F   ALTER TABLE ONLY public.rejestrator DROP CONSTRAINT rejestrator_pkey;
       public                 postgres    false    218            W           2606    16452    slownik_bad slownik_bad_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.slownik_bad
    ADD CONSTRAINT slownik_bad_pkey PRIMARY KEY (kod);
 F   ALTER TABLE ONLY public.slownik_bad DROP CONSTRAINT slownik_bad_pkey;
       public                 postgres    false    223            _           2606    32872    pracownicy username 
   CONSTRAINT     R   ALTER TABLE ONLY public.pracownicy
    ADD CONSTRAINT username UNIQUE (username);
 =   ALTER TABLE ONLY public.pracownicy DROP CONSTRAINT username;
       public                 postgres    false    227            Q           2606    16416    wizyta wizyta_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.wizyta
    ADD CONSTRAINT wizyta_pkey PRIMARY KEY (id_wiz);
 <   ALTER TABLE ONLY public.wizyta DROP CONSTRAINT wizyta_pkey;
       public                 postgres    false    220            i           2606    16472    badanie_lab Kod    FK CONSTRAINT     v   ALTER TABLE ONLY public.badanie_lab
    ADD CONSTRAINT "Kod" FOREIGN KEY (sl_bad) REFERENCES public.slownik_bad(kod);
 ;   ALTER TABLE ONLY public.badanie_lab DROP CONSTRAINT "Kod";
       public               postgres    false    4695    223    225            g           2606    24690    badanie_fiz Kod    FK CONSTRAINT     }   ALTER TABLE ONLY public.badanie_fiz
    ADD CONSTRAINT "Kod" FOREIGN KEY (kod) REFERENCES public.slownik_bad(kod) NOT VALID;
 ;   ALTER TABLE ONLY public.badanie_fiz DROP CONSTRAINT "Kod";
       public               postgres    false    223    224    4695            h           2606    24685    badanie_fiz Wizyta    FK CONSTRAINT     �   ALTER TABLE ONLY public.badanie_fiz
    ADD CONSTRAINT "Wizyta" FOREIGN KEY (id_wiz) REFERENCES public.wizyta(id_wiz) NOT VALID;
 >   ALTER TABLE ONLY public.badanie_fiz DROP CONSTRAINT "Wizyta";
       public               postgres    false    224    220    4689            b           2606    16427    wizyta id_lek    FK CONSTRAINT     p   ALTER TABLE ONLY public.wizyta
    ADD CONSTRAINT id_lek FOREIGN KEY (id_lek) REFERENCES public.lekarz(id_lek);
 7   ALTER TABLE ONLY public.wizyta DROP CONSTRAINT id_lek;
       public               postgres    false    4687    219    220            c           2606    16417    wizyta id_pac    FK CONSTRAINT     q   ALTER TABLE ONLY public.wizyta
    ADD CONSTRAINT id_pac FOREIGN KEY (id_pac) REFERENCES public.pacjent(id_pac);
 7   ALTER TABLE ONLY public.wizyta DROP CONSTRAINT id_pac;
       public               postgres    false    217    4683    220            d           2606    16422    wizyta id_rej    FK CONSTRAINT     u   ALTER TABLE ONLY public.wizyta
    ADD CONSTRAINT id_rej FOREIGN KEY (id_rej) REFERENCES public.rejestrator(id_rej);
 7   ALTER TABLE ONLY public.wizyta DROP CONSTRAINT id_rej;
       public               postgres    false    218    220    4685            j           2606    16477    badanie_lab kierownik    FK CONSTRAINT     �   ALTER TABLE ONLY public.badanie_lab
    ADD CONSTRAINT kierownik FOREIGN KEY (id_klab) REFERENCES public.kierownik_lab(id_klab);
 ?   ALTER TABLE ONLY public.badanie_lab DROP CONSTRAINT kierownik;
       public               postgres    false    225    4693    222            n           2606    24716    pracownicy kierownik    FK CONSTRAINT     �   ALTER TABLE ONLY public.pracownicy
    ADD CONSTRAINT kierownik FOREIGN KEY (id_klab) REFERENCES public.kierownik_lab(id_klab) NOT VALID;
 >   ALTER TABLE ONLY public.pracownicy DROP CONSTRAINT kierownik;
       public               postgres    false    4693    222    227            k           2606    16467    badanie_lab laborant    FK CONSTRAINT     y   ALTER TABLE ONLY public.badanie_lab
    ADD CONSTRAINT laborant FOREIGN KEY (id_lab) REFERENCES public.laborant(id_lab);
 >   ALTER TABLE ONLY public.badanie_lab DROP CONSTRAINT laborant;
       public               postgres    false    225    221    4691            o           2606    24711    pracownicy laborant    FK CONSTRAINT     �   ALTER TABLE ONLY public.pracownicy
    ADD CONSTRAINT laborant FOREIGN KEY (id_lab) REFERENCES public.laborant(id_lab) NOT VALID;
 =   ALTER TABLE ONLY public.pracownicy DROP CONSTRAINT laborant;
       public               postgres    false    227    221    4691            p           2606    24701    pracownicy lekarz    FK CONSTRAINT     ~   ALTER TABLE ONLY public.pracownicy
    ADD CONSTRAINT lekarz FOREIGN KEY (id_lek) REFERENCES public.lekarz(id_lek) NOT VALID;
 ;   ALTER TABLE ONLY public.pracownicy DROP CONSTRAINT lekarz;
       public               postgres    false    4687    219    227            m           2606    24743    harmonogram_pracy lekarz    FK CONSTRAINT     �   ALTER TABLE ONLY public.harmonogram_pracy
    ADD CONSTRAINT lekarz FOREIGN KEY (id_lek) REFERENCES public.lekarz(id_lek) NOT VALID;
 B   ALTER TABLE ONLY public.harmonogram_pracy DROP CONSTRAINT lekarz;
       public               postgres    false    219    226    4687            a           2606    24723    lekarz numer_pracownika    FK CONSTRAINT     �   ALTER TABLE ONLY public.lekarz
    ADD CONSTRAINT numer_pracownika FOREIGN KEY (id_prac) REFERENCES public.pracownicy(id_prac) NOT VALID;
 A   ALTER TABLE ONLY public.lekarz DROP CONSTRAINT numer_pracownika;
       public               postgres    false    227    219    4701            `           2606    24728    rejestrator numer_pracownika    FK CONSTRAINT     �   ALTER TABLE ONLY public.rejestrator
    ADD CONSTRAINT numer_pracownika FOREIGN KEY (id_prac) REFERENCES public.pracownicy(id_prac) NOT VALID;
 F   ALTER TABLE ONLY public.rejestrator DROP CONSTRAINT numer_pracownika;
       public               postgres    false    227    218    4701            e           2606    24733    laborant numer_pracownika    FK CONSTRAINT     �   ALTER TABLE ONLY public.laborant
    ADD CONSTRAINT numer_pracownika FOREIGN KEY (id_prac) REFERENCES public.pracownicy(id_prac) NOT VALID;
 C   ALTER TABLE ONLY public.laborant DROP CONSTRAINT numer_pracownika;
       public               postgres    false    221    4701    227            f           2606    24738    kierownik_lab numer_pracownika    FK CONSTRAINT     �   ALTER TABLE ONLY public.kierownik_lab
    ADD CONSTRAINT numer_pracownika FOREIGN KEY (id_prac) REFERENCES public.pracownicy(id_prac) NOT VALID;
 H   ALTER TABLE ONLY public.kierownik_lab DROP CONSTRAINT numer_pracownika;
       public               postgres    false    227    4701    222            q           2606    24706    pracownicy rejestrator    FK CONSTRAINT     �   ALTER TABLE ONLY public.pracownicy
    ADD CONSTRAINT rejestrator FOREIGN KEY (id_rej) REFERENCES public.rejestrator(id_rej) NOT VALID;
 @   ALTER TABLE ONLY public.pracownicy DROP CONSTRAINT rejestrator;
       public               postgres    false    4685    218    227            l           2606    16482    badanie_lab wizyta    FK CONSTRAINT     u   ALTER TABLE ONLY public.badanie_lab
    ADD CONSTRAINT wizyta FOREIGN KEY (id_wiz) REFERENCES public.wizyta(id_wiz);
 <   ALTER TABLE ONLY public.badanie_lab DROP CONSTRAINT wizyta;
       public               postgres    false    4689    220    225            
      x������ � �            x������ � �            x������ � �            x������ � �            x������ � �            x������ � �         `   x�3���M,��40�ACN���Ĝ��LN##]C �,+�ˆJ9�V$���%��rq�&���b����Z4��jFnbI&Є��D�1z\\\ ��'�            x������ � �            x������ � �      	      x������ � �            x������ � �     