use sakila;
select * from actor;
-- 1a
select first_name, last_name from actor;
-- 1b
select concat(first_name, ' ', last_name) as full_name from actor;
-- 2a
select actor_id, first_name, last_name from actor where first_name = 'Joe';
-- 2b
select last_name from actor where last_name like '%GEN%';
-- 2c
select last_name from actor where last_name like '%LI%';
-- 2d
select country, country_id from country where country in ('Afghanistan', 'Bangladesh', 'China');
-- 3a
alter table actor
add column description blob after last_name;
-- 3b
ALTER TABLE actor DROP COLUMN description;
-- 4a
select last_name from actor;
select last_name, count(*) as NUM from actor group by last_name;
-- 4b
select last_name, count(*) as NUM from actor group by last_name having NUM > 1;
-- 4c
update actor set first_name='HARPO' where first_name='GROUCHO';
-- 4d
update actor set first_name='GROUCHO' where first_name='HARPO';
-- 5a
describe address;
-- 6a
select s.first_name, s.last_name, a.address
from staff s left join address a on s.address_id = a.address_id;
-- 6b
select * from payment;
select s.first_name, s.last_name, sum(p.amount) as 'total'
from staff s left join payment p on s.staff_id = p.staff_id GROUP BY s.first_name, s.last_name;
-- 6c
select f.title, count(a.actor_id) as 'total'
from film f left join film_actor a on f.film_id = a.film_id
group by f.title;
-- 6d
select title, count(inventory_id) from film f inner join inventory i 
on f.film_id = i.film_id
where title = "Hunchback Impossible";
-- 6e
select last_name, first_name, SUM(amount) from payment p
inner join customer c
on p.customer_id = c.customer_id
group by p.customer_id;
-- 7a
select title
from film where title 
like 'K%' or title like 'Q%'
and title in 
(
select title 
from film 
where language_id = 1
);
-- 7b
select first_name, last_name
from actor 
where actor_id in
(
Select actor_id 
from film_actor
where film_id in
(
select film_id
from film
where title = 'Alone Trip'
)
);
-- 7c
select cs.first_name, cs.last_name, cs.email 
from customer cs
join address a 
on (cs.address_id = a.address_id)
join city c
ON (c.city_id = a.city_id)
join country
on (country.country_id = c.country_id)
where country.country= 'Canada';
-- 7d
select title, description from film 
where film_id in
(
select film_id from film_category
where category_id in
(
select category_id from category
where name = "Family"
));
-- 7e
select f.title, count(rental_id) as 'times rented'
from rental r
join inventory i
on (r.inventory_id = i.inventory_id)
join film f
on (i.film_id = f.film_id)
group by f.title
order by 'times rented' desc;
-- 7f
select s.store_id, sum(amount) as 'Revenue'
from payment p
join rental r
on (p.rental_id = r.rental_id)
join inventory i
on (i.inventory_id = r.inventory_id)
join store s
on (s.store_id = i.store_id)
group by s.store_id; 
-- 7g
select s.store_id, cty.city, country.country 
from store s
join address a 
on (s.address_id = a.address_id)
join city cty
on (cty.city_id = a.city_id)
join country
on (country.country_id = cty.country_id);
-- 7h
select c.name as 'Genre', sum(p.amount) as 'Gross' 
from category c
join film_category fc 
on (c.category_id=fc.category_id)
join inventory i 
on (fc.film_id=i.film_id)
join rental r 
on (i.inventory_id=r.inventory_id)
join payment p 
on (r.rental_id=p.rental_id)
group by c.name order by Gross  limit 5;
-- 8a
create view genre_revenue as
select c.name as 'Genre', sum(p.amount) as 'Gross' 
from category c
join film_category fc 
on (c.category_id=fc.category_id)
join inventory i 
on (fc.film_id=i.film_id)
join rental r 
on (i.inventory_id=r.inventory_id)
join payment p 
on (r.rental_id=p.rental_id)
group by c.name order by Gross  limit 5;
-- 8b
SELECT * FROM genre_revenue;
-- 8c
DROP VIEW genre_revenue;
