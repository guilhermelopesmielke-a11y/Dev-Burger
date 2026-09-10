-- Catalogo inicial (categorias e produtos) para popular um banco novo.
--
-- Gerado a partir do backup.sql local. Rode DEPOIS das migrations, no editor
-- SQL do Neon. Nao inclui usuarios de proposito: hash de senha de conta real
-- nao entra em repositorio publico. Crie a sua conta pelo site e promova a
-- admin com o UPDATE comentado no final.

INSERT INTO public.categories (id, name, updated_at, created_at, path) VALUES
  (1, 'Entradas', '2026-08-13 12:24:18.485+00', '2026-08-13 12:24:18.485+00', 'f8c6ef0f-542a-4715-904d-fe02345e47e9-category_1.png'),
  (2, 'Hambúrgueres', '2026-08-13 12:24:18.571+00', '2026-08-13 12:24:18.571+00', 'bdc4c7b3-ce3a-4fb2-a946-67ba52465a78-category_2.png'),
  (3, 'Bebidas', '2026-08-13 12:24:18.592+00', '2026-08-13 12:24:18.592+00', '568e32f6-ae61-4022-a51a-f514e81622d8-category_3.png'),
  (4, 'Sobremesas', '2026-08-13 12:24:18.651+00', '2026-08-13 12:24:18.651+00', 'e39404bf-6c50-492c-bc27-269615e82b5e-category_4.png')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, name, price, path, created_at, updated_at, category_id, offers) VALUES
  (1, 'Saladas', 2590, '91f0ac5a-0d96-4535-805f-1c2a49af8b76-appe_1.png', '2026-08-13 12:24:18.709+00', '2026-08-13 12:24:18.709+00', 1, true),
  (3, 'Carpaccios', 3990, '9334c1a7-d18f-4b2b-98ac-8f37e665b224-appe_3.png', '2026-08-13 12:24:18.751+00', '2026-08-13 12:24:18.751+00', 1, true),
  (4, 'Ceviches', 4500, 'a68e9ee7-88a3-43ae-b663-eb8b89b14803-appe_4.png', '2026-08-13 12:24:18.759+00', '2026-08-13 12:24:18.759+00', 1, false),
  (5, 'Tábua de Queijos e Frios', 6990, 'fd9e85a3-ef6f-4c93-a3df-1aa7aba0b66c-appe_5.png', '2026-08-13 12:24:18.771+00', '2026-08-13 12:24:18.771+00', 1, true),
  (6, 'Croquetes', 2390, '0481e1ee-60b1-484e-a399-1e564e9933b1-appe_6.png', '2026-08-13 12:24:18.785+00', '2026-08-13 12:24:18.785+00', 1, false),
  (7, 'Pastéis', 3590, '0a2e292c-775b-422a-aa6b-e83b63487f26-appe_7.png', '2026-08-13 12:24:18.797+00', '2026-08-13 12:24:18.797+00', 1, true),
  (8, 'Tartines', 2590, 'b873e4bb-a9b4-4d1d-bc47-c7393dac9bc4-appe_8.png', '2026-08-13 12:24:18.809+00', '2026-08-13 12:24:18.809+00', 1, false),
  (9, 'Bolinhos de Bacalhau', 4590, '4fa8ee9d-5a48-4795-9189-7b7d73f43a50-appe_9.png', '2026-08-13 12:24:18.823+00', '2026-08-13 12:24:18.823+00', 1, false),
  (10, 'X-Tudo Duplo Frango', 2990, '7e971147-c8e6-4ec7-9f47-53a7fe197127-burger_1.png', '2026-08-13 12:24:18.835+00', '2026-08-13 12:24:18.835+00', 2, true),
  (11, 'X-Bacon com Ovo', 3590, '437076e6-ef19-4280-8515-d94386f59988-burger_2.png', '2026-08-13 12:24:18.845+00', '2026-08-13 12:24:18.845+00', 2, false),
  (12, 'Duplo X-Salada Picante', 3490, 'c429b676-d87a-4aa2-9de8-8795c4fee757-burger_3.png', '2026-08-13 12:24:18.86+00', '2026-08-13 12:24:18.86+00', 2, true),
  (13, 'X-Salada', 3190, 'c1e2ec87-d331-46d7-9ecd-ec473eca2171-burger_4.png', '2026-08-13 12:24:18.875+00', '2026-08-13 12:24:18.875+00', 2, false),
  (14, 'X-Especial da casa com Nuggets', 3690, 'b58eeb50-630b-4e13-9c14-39ca0091c9b8-burger_5.png', '2026-08-13 12:24:18.891+00', '2026-08-13 12:24:18.891+00', 2, true),
  (15, 'Duplo X-salada com molho especial', 3890, 'cc3cb7ac-09ad-48e2-9afe-f07f2bf09a0b-burger_6.png', '2026-08-13 12:24:18.907+00', '2026-08-13 12:24:18.907+00', 2, false),
  (16, 'X-Tudo Duplo Frango', 3490, '24ed3b72-547f-4c99-aa97-2a5a09d71591-burger_7.png', '2026-08-13 12:24:18.921+00', '2026-08-13 12:24:18.921+00', 2, true),
  (17, 'X- Bacon com molho da casa', 3690, '5af6f935-2728-4d38-90f5-9a70602a28a8-burger_8.png', '2026-08-13 12:24:18.934+00', '2026-08-13 12:24:18.934+00', 2, false),
  (18, 'Duplo X-Salada Picante', 3690, '50d5e358-5f43-470c-97d5-21aaa1f46d7e-burger_9.png', '2026-08-13 12:24:18.947+00', '2026-08-13 12:24:18.947+00', 2, false),
  (19, 'Refrigerantes', 590, '54e88d93-5f00-4fd6-a8fa-91913cfd66c0-drink_1.png', '2026-08-13 12:24:18.96+00', '2026-08-13 12:24:18.96+00', 3, true),
  (20, 'Água com Gás', 490, '7df75a9c-26ee-404e-b5db-1c4113b12aa7-drink_2.png', '2026-08-13 12:24:18.976+00', '2026-08-13 12:24:18.976+00', 3, false),
  (21, 'Sucos Naturais', 1190, '4693e48d-0c5c-4ef7-a970-3c6f4d44711e-drink_3.png', '2026-08-13 12:24:18.994+00', '2026-08-13 12:24:18.994+00', 3, true),
  (22, 'Café Espresso', 790, 'e0040b09-410e-43ed-8a9f-c40e69ea25bf-drink_4.png', '2026-08-13 12:24:19.012+00', '2026-08-13 12:24:19.012+00', 3, false),
  (23, 'Chás', 590, '4d157cb7-56db-4122-85f3-ac42f367e4b1-drink_5.png', '2026-08-13 12:24:19.027+00', '2026-08-13 12:24:19.027+00', 3, true),
  (24, 'Bebidas Lácteas', 1590, 'b79f92c6-4bf2-4764-9459-9e832f06895e-drink_6.png', '2026-08-13 12:24:19.039+00', '2026-08-13 12:24:19.039+00', 3, false),
  (25, 'Coquetéis', 2390, '1c934eeb-c09e-4945-8c78-0263ba1461d0-drink_7.png', '2026-08-13 12:24:19.049+00', '2026-08-13 12:24:19.049+00', 3, true),
  (26, 'Bebidas Alcoólicas', 2690, '73b6ee11-0112-46ca-a953-cb69a04fd5d9-drink_8.png', '2026-08-13 12:24:19.065+00', '2026-08-13 12:24:19.065+00', 3, false),
  (27, 'Energéticos', 1390, 'b4de2b17-0024-455d-9024-b2f8f7fedc86-drink_9.png', '2026-08-13 12:24:19.088+00', '2026-08-13 12:24:19.088+00', 3, false),
  (28, 'Bolos', 1590, '3692039f-9e65-4931-bd51-64535b4573df-dessert_1.png', '2026-08-13 12:24:19.113+00', '2026-08-13 12:24:19.113+00', 4, true),
  (29, 'Sorvetes', 1690, '9f12cc80-25e8-4b71-a178-62c388166021-dessert_2.png', '2026-08-13 12:24:19.139+00', '2026-08-13 12:24:19.139+00', 4, false),
  (30, 'Pudins', 1290, '8e07baef-02af-4ecc-a48f-ad77db1b3055-dessert_3.png', '2026-08-13 12:24:19.156+00', '2026-08-13 12:24:19.156+00', 4, true),
  (31, 'Mousses', 1490, 'f0bf0de9-4fcb-40f3-a459-87ca2c897d00-dessert_4.png', '2026-08-13 12:24:19.174+00', '2026-08-13 12:24:19.174+00', 4, false),
  (32, 'Gelatinas', 690, 'cbe6dfd9-2987-426f-a3d8-0a1559065b6e-dessert_5.png', '2026-08-13 12:24:19.193+00', '2026-08-13 12:24:19.193+00', 4, true),
  (33, 'Tortas', 1890, '35f5ad20-1f12-49e3-b0b1-ee46efe7d973-dessert_6.png', '2026-08-13 12:24:19.215+00', '2026-08-13 12:24:19.215+00', 4, false),
  (34, 'Doces Tradicionais', 890, '4df6f304-25ce-4fa2-baf2-de50fbfff28f-dessert_7.png', '2026-08-13 12:24:19.236+00', '2026-08-13 12:24:19.236+00', 4, true),
  (35, 'Pavês', 1790, '24a7b15c-12cc-4938-8f02-43a8fdd50a38-dessert_8.png', '2026-08-13 12:24:19.257+00', '2026-08-13 12:24:19.257+00', 4, false),
  (36, 'Cheesecakes', 2290, '3bd91906-c957-4360-80bb-9f8d9e56b79e-dessert_9.png', '2026-08-13 12:24:19.275+00', '2026-08-13 12:24:19.275+00', 4, false),
  (37, 'Batata Rústica', 1600, 'f3dec43b-0c4e-4c07-9632-e754e00f1f54-images.jpeg', '2026-09-04 14:46:18.08+00', '2026-09-04 14:46:18.08+00', 1, false),
  (38, 'Cookie', 1000, 'a5b073d0-ce5d-46d9-9c29-7ce17e0e71d8-images (1).jpeg', '2026-09-07 14:25:19.242+00', '2026-09-07 14:25:19.242+00', 4, true),
  (2, 'Bruschettas', 3090, 'd1a5cbab-d8b2-4f20-9f08-05c1bb83d1c5-appe_2.png', '2026-08-13 12:24:18.737+00', '2026-09-09 14:28:46.4+00', 1, false)
ON CONFLICT (id) DO NOTHING;

-- As sequences precisam pular para depois do maior id inserido, senao o
-- proximo cadastro pela area administrativa colide com um id que ja existe.
SELECT setval('public.categories_id_seq', (SELECT MAX(id) FROM public.categories));
SELECT setval('public.products_id_seq', (SELECT MAX(id) FROM public.products));

-- Depois de se cadastrar pelo site, rode isto trocando o email para virar admin:
-- UPDATE public.users SET admin = true WHERE email = 'seu@email.com';
