package kr.codesquad.item.dto;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import kr.codesquad.item.dto.response.ItemCountDataResponse;
import kr.codesquad.item.dto.response.ItemListResponse;
import kr.codesquad.item.dto.response.UserItemListResponse;
import kr.codesquad.item.dto.vo.ItemListVo;

@Mapper
public interface ItemMapper {
	ItemMapper INSTANCE = Mappers.getMapper(ItemMapper.class);

	@Mapping(target = "countData", source = "countData")
	@Mapping(target = "statusName", source = "statusName")
	@Mapping(target = "isSeller", source = "isSeller")
	ItemListResponse toItemListResponse(ItemListVo itemListVo, ItemCountDataResponse countData
		, String statusName, Boolean isSeller);

	@Mapping(target = "countData", source = "countData")
	@Mapping(target = "statusName", source = "statusName")
	UserItemListResponse toUserItemListResponse(ItemListVo itemListVo, ItemCountDataResponse countData
		, String statusName);

}
