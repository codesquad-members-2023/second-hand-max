package com.cokkiri.secondhand.item.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cokkiri.secondhand.item.entity.Location;

public interface LocationRepository extends JpaRepository<Location, Long> {

	public Optional<Location> findByName(String name);
}
